import Block from 'core/Block';
import BubbleGroupProps from 'components/bubble/bubble-group/bubbleGroup';

import './chatBubbles.css';

export default interface ChatBubblesProps extends Props {
    bubbleGroupProps?: BubbleGroupProps[],
}

export class ChatBubbles extends Block<ChatBubblesProps> {
    public static readonly NAME = 'ChatBubbles';
    
    constructor({ ...props }: ChatBubblesProps) {
        super(props);
    }

    render() {
        console.log('render', this.constructor.name);
        
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