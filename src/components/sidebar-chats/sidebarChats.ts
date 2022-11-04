import './sidebarChats.css';
import { Block } from 'core';
import { ChatDialogProps, ChatDialog } from './chat-dialog';

export interface SidebarChatsProps extends Props {
    chatsProps?: ChatDialogProps[],
    stub?: string,
}

export default class SidebarChats extends Block<SidebarChatsProps> {
    static readonly componentName = 'SidebarChats';

    constructor({ chatsProps, stub = 'Загрузка...' }: SidebarChatsProps) {
        super({
            chatsProps, stub
        });
    }

    selectChat(id: number) {
        const chats = this.refs.chats as ChatDialog[];

        const selectedChat = chats.find((chat) => chat.getId() === id);

        this._onChatClick(selectedChat!);
    }

    private _activeChat?: ChatDialog;

    private _onChatClick(chat: ChatDialog) {
        if (this._activeChat) {
            this._activeChat.setActive(false);
        }

        this._activeChat = chat;
        this._activeChat.setActive(true);
    }

    protected render() {
        console.log('render SidebarChats');

        // language=hbs
        return `
        <div class="sidebar__chats">
            {{#if chatsProps}}
                {{#each chatsProps}}
                    {{#with this}}
                        {{{ChatDialog
                            chatId=chatId
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
            {{else}}
                <div class="sidebar__chats-stub grey content-center">
                    {{stub}}
                </div>
            {{/if}}
        </div>
    `;
    }
}
