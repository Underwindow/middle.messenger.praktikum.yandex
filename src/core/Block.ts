import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P extends Props = {}> {
    new(props: P): Block<P>;
    componentName?: string;
}

export default abstract class Block<P extends Props = {}> {
    static readonly EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: 'flow:render',
    } as const;

    static componentName?: string;

    readonly id = nanoid(6);

    private _element: Nullable<HTMLElement> = null;

    protected readonly props: P;

    protected state: Record<string, unknown> = {};

    protected children: { [id: string]: Block } = {};

    protected refs: { [key: string]: Block<Props> | Block<Props>[] } = {};

    eventBus: () => EventBus<Events>;

    constructor(props?: P) {
        const eventBus = new EventBus<Events>();

        this.getStateFromProps(props);

        this.props = this._makePropsProxy(props);
        this.state = this._makePropsProxy(this.state);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    /* eslint-disable-next-line */
    protected getStateFromProps(props?: P): void {
        this.state = props ?? {};
    }

    private _makePropsProxy(props?: Props): P {
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                /* eslint-disable-next-line */
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        }) as unknown as P;
    }

    private _registerEvents(eventBus: EventBus<Events>) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _createResources() {
        this._element = this._createDocumentElement('div');
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    private _componentDidMount(props: P) {
        this._checkInDom();

        this.componentDidMount(props);
    }

    private _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    protected componentDidMount(props: P): P {
        return props;
    }

    private _componentWillUnmount() {
        this.eventBus().destroy();
        this.componentWillUnmount();
    }

    protected componentWillUnmount() { }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        if (oldProps !== newProps) {
            Object.keys(this.children).forEach((id) => {
                this.children[id]._removeEvents();
                delete this.children[id];
            });
            Object.keys(this.refs).forEach((key) => delete this.refs[key]);

            return true;
        }

        return false;
    }

    private _render() {
        const fragment = this._compile();

        this._removeEvents();
        const newElement = fragment.firstElementChild!;

        this._element!.replaceWith(newElement);

        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    private _compile(): DocumentFragment {
        const fragment = document.createElement('template');

        const template = Handlebars.compile(this.render());

        fragment.innerHTML = template({
            ...this.state,
            ...this.props,
            children: this.children,
            refs: this.refs,
        });

        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (!stub) {
                return;
            }

            const stubChilds = stub.childNodes.length ? stub.childNodes : [];
            const content = component.getContent();

            stub.replaceWith(content);

            const layoutContent = content.querySelector('[data-layout="1"]');

            if (layoutContent && stubChilds.length) {
                layoutContent.append(...stubChilds);
            }
        });

        return fragment.content;
    }

    private _removeEvents() {
        const events = this.props.events as Record<string, Callback>;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    private _addEvents() {
        const events = this.props.events as Record<string, Callback>;

        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });
    }

    protected render(): string {
        return '';
    }

    setProps = (nextProps: Partial<P>) => {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    };

    getRefs = <Ref extends Block>(ref: Block | Block[]): Ref[] | undefined => {
        const refs = Array.isArray(ref) ? ref : [ref];

        if (refs && refs.length > 0 && refs[0] === undefined) { return undefined; }

        return refs as unknown as Ref[];
    };

    getRef = <Ref extends Block>(ref: Block | Block[]): Ref | undefined => {
        const outRef = Array.isArray(ref) ? undefined : ref;

        return outRef as unknown as Ref;
    };

    setState = (nextState: any) => {
        if (!nextState) {
            return;
        }

        Object.assign(this.state, nextState);
    };

    getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
                }
            }, 100);
        }

        return this.element!;
    }

    get element() {
        return this._element;
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}
