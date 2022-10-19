import './sidebarChats.css';
import Block from 'core/Block';
import ChatDialog, { ChatDialogProps } from './chat-dialog/chatDialog';

export interface SidebarChatsProps extends Props {
    chatsProps?: ChatDialogProps[],
}

export default class SidebarChats extends Block<SidebarChatsProps> {
    static readonly NAME = 'SidebarChats';

    chatClicked = new CustomEvent('chatClicked', {
        bubbles: false,
        detail: { id: () => this._activeChat!.id },
    });

    constructor({ chatsProps }: SidebarChatsProps) {
        super({
            chatsProps,
        });
    }

    protected componentDidMount(props: SidebarChatsProps): SidebarChatsProps {
        this.subscribeOnChats();
        
        return props;
    }

    subscribeOnChats() {
        const chats = this.refs.chats as ChatDialog[];

        if (!chats) return;

        chats.forEach((chat) => {
            chat.setProps({
                events: {
                    click: (e: Event) => { this._onChatClick(e, chat); },
                },
            });
        });
    }

    private _activeChat?: ChatDialog;

    private _onChatClick(e: Event, chat: ChatDialog) {
        if (this._activeChat) {
            this._activeChat.setActive(false);
        }

        this._activeChat = chat;
        this._activeChat.setActive(true);
        this.element?.dispatchEvent(this.chatClicked);
    }

    protected render() {
        console.log('render SidebarChats');

        // language=hbs
        return `
        <div class="sidebar__chats">
            <div class="scrollable-y">
                {{#each chatsProps}}
                    {{#with this}}
                        {{{ChatDialog
                            ref="chats"
                            onClick=onClick
                            avatarSrc=avatarSrc 
                            chatName=chatName 
                            time=time 
                            lastMessage=lastMessage 
                            badge=badge
                        }}}
                    {{/with}}                
                {{/each}}
            </div>
        </div>
    `;
    }
}
