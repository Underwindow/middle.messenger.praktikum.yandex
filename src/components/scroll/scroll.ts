import './scroll.css';
import { Block } from 'core';

export interface ScrollProps extends Props {
    scrollContent: string,
    observeSelector: string,
    direction?: ScrollDirection,
    onObserve: Callback,
}

export enum ScrollDirection {
    Default = 'default',
    Reversed = 'reversed',
}

export default class Scroll extends Block<ScrollProps> {
    static readonly componentName = 'Scroll';

    constructor({ direction = ScrollDirection.Default, ...props }: ScrollProps) {
        super({ ...props, direction })
    }

    watch() {
        const watch = this.getContent().querySelector(this.props.observeSelector);

        if (watch) {
            const ob = new IntersectionObserver((payload) => {
                if (payload[0].isIntersecting) {
                    this.props.onObserve();
                    ob.unobserve(watch);
                }

            });
            ob.observe(watch);
        }
    }

    protected getStateFromProps(props?: ScrollProps): void {
        const nextState = {
            scrollContent: props === undefined ? '' : props.scrollContent,
        }

        this.setState(nextState);
    }

    getScrollContent<T extends Block>() {
        const refName = this.state.scrollContent as string;

        return refName ? this.getRef<T>(this.refs[refName]) : undefined;
    }

    protected render() {
        const component = this.state.scrollContent as string;

        // language=hbs
        return `
        <div class="scroll">
            <div class="scrollable-y scroll__scroll-{{direction}}">
                {{#if scrollContent}}
                    {{{${component}
                        ref="${component}"
                    }}}
                {{/if}}
            </div>
        </div>
    `;
    }
}
