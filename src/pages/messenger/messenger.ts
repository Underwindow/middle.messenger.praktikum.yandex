import './messenger.css';
import { Block, CoreRouter, Store } from 'core';
import {
    Screens, withRouter, withStore, withUser,
} from 'utils';
import { ValidationType } from 'utils/validateValue';
import {
    chatsService, logout,
} from 'services';
import { Scroll, ScrollDirection } from 'components/scroll';
import { SidebarChats } from 'components/sidebar-chats';
import { ChatDialogProps } from 'components/chat-dialog';
import { NewChatForm } from 'components/new-chat';
import { Chat } from 'components/chat';
import { ButtonIcon, ButtonIconProps } from 'components/button/button-icon';
import { Input } from 'components';

interface MessengerProps extends Props {
    router: CoreRouter,
    store: Store<AppState>,
    user: User | null,
    btnLogoutProps: ButtonIconProps,
    onProfileClick: Callback,
    onSearch: Callback,
    onAddChatClick: Callback,
    onAddChatSubmit: Callback,
}

export class Messenger extends Block<MessengerProps> {
    static readonly componentName = 'Messenger';

    private _chatSocket?: WebSocket;

    private _chatsUpdateInterval?: NodeJS.Timer;

    constructor(props: MessengerProps) {
        super({
            ...props,
            btnLogoutProps: {
                icon: ButtonIcon.ICONS.LOGOUT,
                onClick: () => {
                    this._chatSocket?.close();
                    clearTimeout(this._chatsUpdateInterval!);
                    this.props.store.dispatch(logout);
                },
            },
            onProfileClick: () => {
                this._chatSocket?.close();
                clearTimeout(this._chatsUpdateInterval!);
                this.props.router.go(Screens.Profile);
            },
            onSearch: () => {
                console.log('onSearch');
            },
            onAddChatClick: () => {
                const chatForm = (this.refs.newChatFormRef as NewChatForm);
                chatForm.show();
            },
            onAddChatSubmit: () => {
                const chatForm = (this.refs.newChatFormRef as NewChatForm);
                chatForm.hide();
                this._updateChats();
            },
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const chatForm = (this.refs.searchInputRef as Input);
                    const isValid = Input.validateFieldset([chatForm]);

                    if (isValid) {
                        console.log('onSearch enter submit');
                    }
                },
            },
        });
    }

    private _initChats(chats: SidebarChats, userChats: UserChat[]) {
        chats.setProps({
            chatsProps: userChats!.map((chat) => ({
                chatId: chat.id,
                chatName: chat.title,
                avatarSrc: chat.avatar,
                lastMessage: chat.lastMessage?.content ?? '',
                time: chat.lastMessage?.time ?? 'Новый',
                badge: chat.unreadCount,
                onClick: () => {
                    this._chatSocket?.close();
                    chats.selectChat(chat.id);
                    this._initChat(chat);
                },
            } as ChatDialogProps)),
        });
    }

    private async _updateChats(offset: number = 0, limit: number = 10, title: string = '') {
        chatsService.getChats({ offset, limit, title }).then((userChats) => {
            const chats = this
                .getRef<Scroll>(this.refs.sidebarScrollRef)
                ?.getScrollContent<SidebarChats>()!;

            if (userChats === null) {
                chats.setProps({ stub: 'Ошибка загрузки' });
            } else if (userChats?.length === 0) {
                chats.setProps({ stub: 'У вас нет чатов :(' });
            } else {
                this._initChats(chats, userChats);
            }
        });
    }

    protected componentDidMount(props: MessengerProps): MessengerProps {
        this._chatsUpdateInterval = setInterval(() => {
            this._updateChats();
            console.log('update sidebar chats');

            clearTimeout(this._chatsUpdateInterval!);
        }, 2000);

        return props;
    }

    private _initChat(userChat: UserChat) {
        const chat = this.getRef<Chat>(this.refs.chatRef)!;

        chatsService.getChatToken(userChat.id).then((token) => {
            if (!token) {
                return;
            }

            const userId = this.props.user!.id;

            chatsService.connectUserToChat(userId, userChat.id, token, (messages, last, isOld) => {
                chat.setMessages(messages, last, isOld);
            })
                .then((socket) => {
                    this._chatSocket = socket;
                    chat.setProps({
                        socket: this._chatSocket,
                        chatId: userChat.id,
                        isAdmin: userChat.createdBy === userId,
                        user: this.props.user!,
                        title: userChat.title,
                        avatar: userChat.avatar,
                        onDeleteChat: () => {
                            this._chatSocket?.close();
                            this._updateChats();
                        },
                    });

                    chat.getStub().hide();
                });
        });
    }

    protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        super.componentDidUpdate(oldProps, newProps);

        return false;
    }

    protected render() {
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
                        <div class="sidebar__actions">
                            <form>
                                {{{Input
                                    validationType="${ValidationType.INPUT_MESSAGE}"
                                    ref="searchInputRef"
                                    name="message"
                                    type="text"
                                    placeholder="Поиск"
                                    icon="search"
                                    onInput=onSearch
                                }}}
                            </form>
                            {{{ButtonIcon onClick=onAddChatClick type="button" icon="${ButtonIcon.ICONS.ADD}"}}}
                        </div>
                        {{{Scroll
                            ref="sidebarScrollRef"
                            direction="${ScrollDirection.Default}"
                            scrollContent="${SidebarChats.componentName}"
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
