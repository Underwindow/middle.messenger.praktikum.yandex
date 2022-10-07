import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type Events = Values<typeof Block.EVENTS>;

export default abstract class Block<
    P extends Props = {},
> {
    public static readonly EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    public readonly id = nanoid(6);

    private _element: Nullable<HTMLElement> = null;

    protected readonly props: P;

    protected children: { [id: string]: Block<{}> } = {};

    eventBus: () => EventBus<Events>;

    // protected state: any = {};

    protected refs: { [key: string]: Block<Props> | Block<Props>[] } = {};

    public constructor(props?: P) {
        const eventBus = new EventBus<Events>();

        this.props = this._makePropsProxy(props || {} as P);
        // this.state = this._makePropsProxy(this.state);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    private _makePropsProxy(props: any): any {
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
        this.componentDidMount(props);
    }

    protected componentDidMount(props: P): P {
        return props;
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        return oldProps !== newProps;
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

        fragment.innerHTML = template({ ...this.props, children: this.children, refs: this.refs });

        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (!stub) {
                return;
            }

            const stubChilds = stub.childNodes.length ? stub.childNodes : [];

            const content = component.getContent();
            stub.replaceWith(content);

            const slotContent = content.querySelector('[data-slot="1"]') as HTMLDivElement;

            if (slotContent && stubChilds.length) {
                slotContent.append(...stubChilds);
                delete slotContent.dataset.slot;
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

    public setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    public getProps = () => this.props;

    // protected getStateFromProps(props: any): void {
    //     this.state = {};
    // }

    // public setState = (nextState: any) => {
    //     if (!nextState) {
    //         return;
    //     }

    //     Object.assign(this.state, nextState);
    // };

    get element() {
        return this._element;
    }

    public getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    public show() {
        this.getContent().style.display = 'block';
    }

    public hide() {
        this.getContent().style.display = 'none';
    }
}
