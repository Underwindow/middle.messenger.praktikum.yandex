import Block from 'core/Block';
import BubbleProps from 'components/bubble/bubble';

import './bubbleGroup.css';

export default interface BubbleGroupProps {
    bubblesDate?: string;
    bubbleProps?: BubbleProps[];
}

export class BubbleGroup extends Block {
    static readonly NAME: string = 'BubbleGroup';

    protected render(): string {
        // language=hbs
        return `
        <section class="bubbles-group">
            <div class="bubbles-group__date">{{bubblesDate}}</div>
            <div class="bubbles-group__bubbles">
                {{#each bubbleProps}}
                {{{Bubble ref="bubbles" isIn=isIn message=message time=time name=name}}}
                {{/each}}
            </div>
        </section>
        `
    }
}