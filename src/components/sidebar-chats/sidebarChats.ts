import Block from 'core/Block';
import ChatDialogProps from 'components/sidebar-chats/chat-dialog/chatDialog';
import ChatDialog from 'components/sidebar-chats/chat-dialog';

import './sidebarChats.css';

export default interface SidebarChatsProps extends Props {
    chatsProps?: ChatDialogProps[],
}

export class SidebarChats extends Block<SidebarChatsProps> {
    static readonly NAME = 'SidebarChats'
    public chatClicked = new CustomEvent('chatClicked', {
        bubbles: false,
        detail: { id: () => this._activeChat!.id }
    });

    constructor({ chatsProps }: SidebarChatsProps) {
        super({
            chatsProps
        });

        this.subscribeOnChats();
    }

    subscribeOnChats() {
        const chats = this.refs.chats as ChatDialog[];
        
        if (!chats)
            return;

        chats.forEach(chat => {
            chat.setProps({
                events: {
                    click: (e: Event) => { this._onChatClick(e, chat); },
                }
            });
        });
    }

    private _activeChat?: ChatDialog;

    _onChatClick(e: Event, chat: ChatDialog) {
        if (this._activeChat) {
            this._activeChat.setActive(false);
        }

        this._activeChat = chat;
        this._activeChat.setActive(true);
        this.element?.dispatchEvent(this.chatClicked);
    }

    render() {
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