import './chatBubbles.css';
import Block from 'core/Block';
import { BubbleGroupProps } from 'components/bubble/bubble-group/bubbleGroup';

export interface ChatBubblesProps extends Props {
    bubbleGroupProps?: BubbleGroupProps[],
}

export default class ChatBubbles extends Block<ChatBubblesProps> {
    static readonly componentName = 'ChatBubbles';

    constructor({ ...props }: ChatBubblesProps) {
        super(props);
    }

    protected render() {
        // language=hbs
        return `
        <div class="chat__bubbles">
            {{#each bubbleGroupProps}}
                {{#with this}}
                    {{{BubbleGroup
                        ref="bubbleGroupsRef" 
                        bubblesDate=bubblesDate
                        bubbleProps=bubbleProps
                    }}}
                {{/with}}
            {{/each}}
        </div>
    `;
    }
}
