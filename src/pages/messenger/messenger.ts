import './messenger.css';
import Block from 'core/Block';
import { SidebarChats } from 'components/sidebar-chats';
import { renderDOM } from 'core';
import { SignInPage } from 'pages/entry';
import { Profile } from 'pages/profile';
import { ValidationType } from 'utils/validateValue';
import ButtonIcon, { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { Chat } from 'components/chat';
import { BubbleProps } from 'components/bubble/bubble';
import { BubbleGroupProps } from 'components/bubble/bubble-group/bubbleGroup';
import { ChatDialogProps } from 'components/sidebar-chats/chat-dialog/chatDialog';
import { nanoid } from 'nanoid';

export default class Messenger extends Block {
    static readonly NAME = 'Messenger';

    constructor() {
        const btnLogoutProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.LOGOUT,
            onClick: () => renderDOM(new SignInPage()),
        };

        const tempChatProp: ChatDialogProps = {
            chatName: 'Эмиль',
            lastMessage: 'Привет, почему не спишь?',
            time: '4:20',
            badge: '1',
            avatarSrc: 'https://www.w3schools.com/tags/img_girl.jpg',
        };

        const chatsProps = [
            tempChatProp,
            { ...tempChatProp },
            { ...tempChatProp },
            { ...tempChatProp },
            { ...tempChatProp },
            { ...tempChatProp },
            { ...tempChatProp },
        ] as ChatDialogProps[];

        super({
            btnLogoutProps,
            chatsProps,
            onProfileClick: () => {
                renderDOM(new Profile());
            },
        });
    }

    protected componentDidMount(props: Props): Props {
        this._subscribeOnSidebarChats();
        
        return props;
    }

    private _subscribeOnSidebarChats() {
        const chats = this.refs.sidebarChatsRef as SidebarChats;

        chats.element?.addEventListener(chats.chatClicked.type, (e: Event) => {
            const activeChatId = (e as CustomEvent).detail.id();
            this._initChat(activeChatId);
        });
    }

    private _initChat(activeChatId: string) {
        console.log(`_initChat()`);
        
        if (activeChatId) {
            const tmpBubbleGroup = { //GET data by chatId
                bubblesDate: new Date().toDateString() + nanoid(4), //Просто чтобы показать, что данные в ChatBubbles меняются
                bubbleProps: [{
                    isIn: false,
                    message: 'Привет',
                    time: '4:20',
                    name: 'Евгений',
                } as BubbleProps, {
                    isIn: true,
                    message: 'Прив, что такое? Где пропадал все это время?',
                    time: '4:21',
                    name: 'Эмиль',
                } as BubbleProps],
            } as BubbleGroupProps;

            const chat = this.refs.chatRef as Chat;

            // chat.getHeader().setProps({
            // });
            chat.getBubbles().setProps({
                bubbleGroupProps: [tmpBubbleGroup, tmpBubbleGroup, tmpBubbleGroup],
            });
            
            chat.getStub().hide();
        }
    }

    protected render() {
        console.log('render Messenger');
        // language=hbs
        return `
        <div class="whole">
            <div class="main-layout">
                <div class="sidebar panel">
                    <div class="sidebar__header">
                        {{{Header 
                            ref="sidebarHeader"
                            title="Евгений"
                            avatarSrc="https://www.w3schools.com/tags/img_girl.jpg"
                            rightBtnProps=btnLogoutProps
                            onClick=onProfileClick
                        }}}
                    </div>
                    <div class="sidebar__content">
                        <form class="sidebar__actions">
                            {{{Input 
                                validationType="${ValidationType.INPUT_MESSAGE}"
                                ref="searchInput"
                                name="message"
                                type="text"
                                placeholder="Поиск"
                                icon="search"
                            }}}
                            {{{ButtonIcon onClick=onClick type="button" icon="${ButtonIcon.ICONS.ADD}"}}}
                        </form>
                        {{{SidebarChats 
                            ref="sidebarChatsRef"
                            chatsProps=chatsProps
                        }}}
                    </div>
                </div>
                {{{Chat ref="chatRef"}}}
            </div>
        </div>
    `;
    }
}
