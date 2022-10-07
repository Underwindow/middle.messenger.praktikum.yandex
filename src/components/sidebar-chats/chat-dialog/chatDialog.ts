import './chatDialog.css';
import Block from 'core/Block';

export interface ChatDialogProps extends Props {
    chatName?: string
    time?: string
    lastMessage?: string
    badge?: string
    avatarSrc?: string
    chatIsOpen?: string
    onClick?: Callback
}

export default class ChatDialog extends Block<ChatDialogProps> {
    static readonly NAME: string = 'ChatDialog';

    static readonly activeClassName: string = 'chat-active__text';

    constructor({ onClick, ...props }: ChatDialogProps) {
        super({
            onClick,
            ...props,
            events: {
                click: onClick,
            },
        });
    }

    public setActive(value = true) {
        if (this.props.chatIsOpen && value) return;

        this.props.chatIsOpen = value ? ChatDialog.activeClassName : '';
    }

    protected render(): string {
        // language=hbs
        return `
        <button type="button" class="clear-btn chat-dialog {{chatIsOpen}}">
            {{#if chatIsOpen}}
            <div class="chat-dialog__active-hint"></div>
            {{/if}}
            {{{Avatar src=avatarSrc }}}
            <div class="chat-dialog__caption">
                <p class="chat-dialog__title">
                    <span class="chat-dialog__name">{{chatName}}</span>
                    <span class="chat-dialog__details">
                        <span class="chat-dialog__time {{chatIsOpen}}">{{time}}</span>
                    </span>                                    
                </p>
                <p class="chat-dialog__subtitle">
                    <span class="chat-dialog__message {{chatIsOpen}}">{{lastMessage}}</span>
                    {{#if badge}}
                    <span class="chat-dialog__badge">{{badge}}</span>
                    {{/if}}
                </p>                                
            </div>
        </button>
        `;
    }
}
