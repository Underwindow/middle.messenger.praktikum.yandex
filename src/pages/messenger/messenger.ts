import './messenger.css';
import Block from 'core/Block';
import { SidebarChats } from 'components/sidebar-chats';
import { CoreRouter, Store } from 'core';
import { ValidationType } from 'utils/validateValue';
import ButtonIcon, { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { Chat } from 'components/chat';
import { ChatDialogProps } from 'components/sidebar-chats/chat-dialog/chatDialog';
import { nanoid } from 'nanoid';
import { Screens, withRouter, withStore, withUser } from 'utils';
import { createChat, getChats, getUser, logout } from 'services';
import { NewChatForm } from 'components/new-chat';
import { connectUserToChat, getChatToken, getChatUsers } from 'services/chats';
import { BubbleProps } from 'components/bubble/bubble';
import { BubbleGroupProps } from 'components/bubble/bubble-group/bubbleGroup';

type MessengerProps = {
    router: CoreRouter,
    store: Store<AppState>,
    user: User | null,
    btnLogoutProps: ButtonIconProps,
    onProfileClick: Callback,
    onSearch: Callback,
    onAddChatClick: Callback,
    onAddChatSubmit: Callback,
};

export class Messenger extends Block<MessengerProps> {
    static readonly componentName = 'Messenger';

    private _chatSocket?: WebSocket;

    constructor(props: MessengerProps) {
        super(props);

        const btnLogoutProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.LOGOUT,
            onClick: () => {
                this._chatSocket?.close();
                this.props.store.dispatch(logout);
            },
        };

        this.setProps({
            btnLogoutProps,
            onProfileClick: () => {
                this._chatSocket?.close();
                this.props.router.go(Screens.Profile);
            },
            onSearch: () => {
                console.log('onSearch');
            },
            onAddChatClick: () => {
                const chatForm = (this.refs.newChatFormRef as NewChatForm);
                chatForm.show();
            },
            onAddChatSubmit: (e: Event) => {
                e.preventDefault;

                const chatForm = (this.refs.newChatFormRef as NewChatForm);
                const input = chatForm.getInput();

                createChat({ title: input.value })
                    .then((chat) => {
                        if (!chat)
                            return;

                        chatForm.hide();
                        this._initChats(true);
                    });
            }
        });
    }

    private _initChats(update: boolean = false, offset: number = 0, limit: number = 10, title: string = '') {
        this._getChats(update, offset, limit, title)
            .then((userChats) => {
                const chats = this.refs.sidebarChatsRef as SidebarChats;

                const chatsProps = userChats!.map(chat => {
                    const tempChatProp: ChatDialogProps = {
                        chatId: chat.id,
                        chatName: chat.title,
                        avatarSrc: chat.avatar,
                        lastMessage: chat.lastMessage?.content ?? 'Sample text',
                        time: chat.lastMessage?.time ?? 'XX:XX',
                        badge: chat.unreadCount,
                        onClick: () => {
                            this._chatSocket?.close();

                            chats.selectChat(chat.id);
                            this._initChat(chat);
                        }
                    };

                    return tempChatProp;
                })

                chats.setProps({ chatsProps });
            });
    }

    private async _getChats(update: boolean = false, offset: number = 0, limit: number = 10, title: string = ''): Promise<UserChat[] | null> {
        if (!update) {
            return this.props.store.getState().userChats;
        }

        return getChats({ offset, limit, title }).then((userChats) => {
            this.props.store.dispatch({ userChats: userChats });
            return userChats;
        });
    }

    protected componentDidMount(props: MessengerProps): MessengerProps {
        const chatData = this.props.store.getState().userChats;
        const needUpdate = chatData === null || chatData === undefined;

        this._initChats(needUpdate);

        return props;
    }

    private _initChat(chatData: UserChat) {
        const chat = this.refs.chatRef as Chat;

        getChatToken(chatData.id).then((token) => {
            if (!token) {
                alert('Ошибка открытия чата');
                return null;
            }

            this._chatSocket = connectUserToChat(this.props.user!.id, chatData.id, token,
                (messages) => {
                    this._onMessage(chat, messages);
                }
            );
            
            chat.setProps({
                socket: this._chatSocket,
                chatId: chatData?.id,
                title: chatData?.title,
                avatar: chatData.avatar,
            })

            chat.getStub().hide();
        });
    }

    private _onMessage(chat: Chat, messages: ChatMessage[]) {
        const bubbles = messages.map((message) => {
            console.log(message.userId);

            const bubble: BubbleProps = {
                isIn: message.userId !== this.props.user!.id,
                message: message.content,
                time: message.time,
                userId: message.userId,
                name: '',
            }
            return bubble;
        });

        const bubbleGroup: BubbleGroupProps = {
            bubblesDate: new Date().toLocaleDateString(),
            bubbleProps: bubbles,
        }

        console.log('here', bubbleGroup);

        chat.getBubbles().concatBubbleGroups([bubbleGroup]);
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
                            title=user.login
                            avatarSrc=user.avatar
                            rightBtnProps=btnLogoutProps
                            onClick=onProfileClick
                        }}}
                    </div>
                    <div class="sidebar__content">
                        <form class="sidebar__actions">
                            {{{Input 
                                validationType="${ValidationType.INPUT_MESSAGE}"
                                ref="searchInputRef"
                                name="message"
                                type="text"
                                placeholder="Поиск"
                                icon="search"
                                onInput=onSearch
                            }}}
                            {{{ButtonIcon onClick=onAddChatClick type="button" icon="${ButtonIcon.ICONS.ADD}"}}}
                        </form>
                        {{{SidebarChats 
                            ref="sidebarChatsRef"
                        }}}
                    </div>
                </div>
                {{{Chat 
                    ref="chatRef"
                }}}
                {{{NewChatForm 
                    ref="newChatFormRef"
                    onFormSubmit=onAddChatSubmit
                }}}
            </div>
        </div>
    `;
    }
}

export default withRouter(withStore(withUser(Messenger)));