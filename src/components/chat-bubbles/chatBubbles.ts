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

    concatBubbleGroups(bubbleGroupProps: BubbleGroupProps[]) {
        const current = this.props.bubbleGroupProps;
        if (current) {
            this.setProps({
                bubbleGroupProps: current.concat(bubbleGroupProps)
            });
        }
        else {
            this.setProps({
                bubbleGroupProps: bubbleGroupProps
            });
        }
    }

    protected getStateFromProps(props?: ChatBubblesProps | undefined): void {
        console.log(props);
        
        // const users: Record<string, number> = {};
        
        // const nextState = {
        //     users: users,
        // }

        // props?.bubbleGroupProps?.forEach((bubbleGroup) => {
        //     Object.entries(nextState.users).forEach(([username, userId]) => {
        //         bubbleGroup.bubbleProps?.forEach((bubble) => {
        //             if (bubble.userId === userId)
        //                 bubble.name = username;
        //         });
        //     })
        // });
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
