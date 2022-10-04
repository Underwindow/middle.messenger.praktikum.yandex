import { BlockProps } from "./BlockProps";
import EventBus from "./EventBus";
import { nanoid } from 'nanoid';

export default abstract class Block<PropType extends BlockProps> {
    public static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);

    private _element: Nullable<HTMLElement> = null;
    private _meta: { props: BlockProps };

    protected children: Record<string, Block<BlockProps> | Block<BlockProps>[]>;
    protected props: PropType;
    protected eventBus: () => EventBus;

    constructor(propsAndChildren = {} as PropType) {
        const eventBus = new EventBus();

        const { children, props } = this._getChildren<PropType>(propsAndChildren);

        this._meta = {
            props: props
        };

        this.children = children;
        this.props = this._makePropsProxy(props) as PropType;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);

        this.initChildren();

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildren<T extends BlockProps>(propsAndChildren: T) {
        const children: Record<string, Block<BlockProps> | Block<BlockProps>[]> = {};
        const blockProps: BlockProps = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value as Block<BlockProps>;
            } else if (Array.isArray(value) && value.every(e => (e instanceof Block))) {
                children[key] = value as Block<BlockProps>[];
            }
            else {
                blockProps[key] = value;
            }
        });

        const props = blockProps as T;

        return { children, props };
    }

    protected abstract initChildren(): void;

    private _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldProps = {...target};
                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    private _componentDidMount() {
        this.componentDidMount(this.props);
    }

    private _componentDidUpdate(oldProps: PropType, newProps: PropType) {
        console.log(oldProps);
        console.log(newProps);
        if (this.componentDidUpdate(oldProps, newProps))
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _render() {
        const block: DocumentFragment = this.render();
        const newElement = block.firstElementChild as HTMLElement;

        if (newElement) {
            if (this._element) //is not first render 
                this._element.replaceWith(newElement);

            this._element = newElement;
            this._addEvents(this._element);
        }
    }

    private _addEvents(element: HTMLElement) {
        const events = this.props.events;

        if (events) {
            Object.entries(events).forEach(([eventName, callback]) => {
                element.addEventListener(eventName, callback);
            });
        }
    }

    protected abstract render(): DocumentFragment;

    protected componentDidMount(oldProps: BlockProps) { }

    // Может переопределять пользователь, необязательно трогать
    protected componentDidUpdate(oldProps: PropType, newProps: PropType): boolean {
        return true;
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    public setProps = (nextProps: PropType) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    public show() {
        if (this.element)
            this.element.style.display = "block";
    }

    public hide() {
        if (this.element)
            this.element.style.display = "none";
    }

    public getContent(): Nullable<HTMLElement> {
        return this.element;
    }

    get element(): Nullable<HTMLElement> {
        return this._element;
    }

    protected compile(template: (context: unknown) => string, context: BlockProps) {
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        const attr = 'data-id';

        Object.entries(this.children).forEach(([key, child]) => { //creates children stubs
            const blocks: Block<BlockProps>[] = Array.isArray(child) ? child : [child];

            context[key] = blocks.reduce((stub, block) =>
                stub + `<div ${attr}="id-${block.id}"></div>`, ''
            );
        });

        fragment.innerHTML = template(context);

        Object.entries(this.children).forEach(([_, child]) => { //replaces stubs with children's content
            const blocks: Block<BlockProps>[] = Array.isArray(child) ? child : [child];

            blocks.forEach(block => {
                const stub = fragment.content.querySelector(`[${attr}="id-${block.id}"]`);

                if (stub)
                    stub.replaceWith(block.element!);
            });
        });

        return fragment.content
    }
}