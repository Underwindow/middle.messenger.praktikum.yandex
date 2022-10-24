import './chatBubbles.css';
import Block from 'core/Block';
import BubbleGroup, { BubbleGroupProps } from 'components/bubble/bubble-group/bubbleGroup';

export interface ChatBubblesProps extends Props {
    bubbleGroupProps?: BubbleGroupProps[],
}

export default class ChatBubbles extends Block<ChatBubblesProps> {
    static readonly componentName = 'ChatBubbles';

    constructor({ ...props }: ChatBubblesProps) {
        super(props);
    }

    private chatUsersCache: { [key: number]: string } = {};

    concatBubbleGroups(bubbleGroupProps: BubbleGroupProps[]) {
        const bubbleGroups = this.getRefs<BubbleGroup>(this.refs.bubbleGroupsRef);

        if (bubbleGroups) {
            bubbleGroups.forEach((group) => {
                group?.getBubbles()?.forEach((bubble) => {
                    if (bubble.name) this.chatUsersCache[bubble.userId] = bubble.name;
                });
            });
        }

        const current = this.props.bubbleGroupProps;

        const result = current ? current.concat(bubbleGroupProps) : bubbleGroupProps;

        result.forEach((groups) => {
            groups.bubbleProps?.forEach((bubbleProps) => {
                /* eslint-disable-next-line */
                bubbleProps.name = this.chatUsersCache[bubbleProps.userId];
            });
        });

        console.log(result);

        this.setProps({
            bubbleGroupProps: result,
        });
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
