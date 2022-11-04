import './bubbleGroup.css';
import { Block } from 'core';
import Bubble, { BubbleProps } from '../bubble';

export interface BubbleGroupProps extends Props {
    bubblesDate?: string,
    bubbleProps?: BubbleProps[],
    last?: boolean,
}

export default class BubbleGroup extends Block<BubbleGroupProps> {
    static readonly componentName: string = 'BubbleGroup';

    getBubbles(): Bubble[] | undefined {
        return this.getRefs<Bubble>(this.refs.bubblesRef);
    }
    
    protected componentDidMount(props: BubbleGroupProps): BubbleGroupProps {
        if (this.props.last !== undefined && this.props.last) {
            this.element?.scrollIntoView(false);
        }

        return props;
    }

    protected componentDidUpdate(oldProps: BubbleGroupProps, newProps: BubbleGroupProps): boolean {
        super.componentDidUpdate(oldProps, newProps);

        console.log('here', oldProps.bubbleProps?.length !== newProps.bubbleProps?.length);
        
        return (oldProps.bubbleProps?.length !== newProps.bubbleProps?.length);
    }

    protected render(): string {
        // language=hbs
        return `
        <section class="bubbles-group">
            <div class="bubbles-group__date">{{bubblesDate}}</div>
            <div class="bubbles-group__bubbles">
                {{#each bubbleProps}}
                {{{Bubble 
                    ref="bubblesRef" 
                    id=id
                    userId=userId 
                    isIn=isIn 
                    date=date
                    message=message 
                    time=time 
                    name=name
                }}}
                {{/each}}
            </div>
        </section>
        `;
    }
}
