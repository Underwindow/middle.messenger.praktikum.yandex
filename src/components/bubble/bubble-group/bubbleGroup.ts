import './bubbleGroup.css';
import Block from 'core/Block';
import Bubble, { BubbleProps } from '../bubble';

export interface BubbleGroupProps {
    bubblesDate?: string;
    bubbleProps?: BubbleProps[];
}

export default class BubbleGroup extends Block<BubbleGroupProps> {
    static readonly componentName: string = 'BubbleGroup';

    getBubbles(): Bubble[] | undefined {
        return this.getRefs<Bubble>(this.refs.bubblesRef);
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
                    userId=userId 
                    isIn=isIn 
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
