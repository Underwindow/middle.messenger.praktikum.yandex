import './chat.css';
import Block from 'core/Block';
import { Input } from 'components/input';
import { ValidationType } from 'utils/validateValue';
import { ChatStub } from 'components/chat-stub';
import { Header } from 'components/header';
import { ButtonIcon } from 'components/button/button-icon';
import { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { ChatBubbles } from 'components/chat-bubbles';
import { ChatActions } from 'components/chat-actions';
import { ChatActionForm } from 'components/chat-action-form';
import {
    addChatUsers, deleteChatUsers, getChatUsers, getUser, loadOldMessages, searchUsers, sendMessage,
} from 'services';
import { BubbleProps } from 'components/bubble/bubble';
import { dateFormat } from 'utils';
import { Scroll, ScrollDirection } from 'components/scroll';

interface ChatProps extends Props {
    chatId: number,
    socket: WebSocket,
    title: string,
    avatar: string,
    moreBtnProps: ButtonIconProps,
    onAddUserClick?: Callback,
    onRemoveUserClick?: Callback,
    onLoadOld?: Callback,
    onSendMessage: Callback,
}

export default class Chat extends Block<ChatProps> {
    static readonly componentName = 'Chat';

    private _currentUserId: number | undefined;

    private _actionsVisible: boolean = false;

    constructor(props: ChatProps) {
        super({
            ...props,
            moreBtnProps: {
                icon: ButtonIcon.ICONS.MORE_VERT,
                onClick: () => this._toggleActions(),
            },
            onAddUserClick: () => {
                const login = () => this._getForm().getInput().value;

                this._initForm(
                    'Добавить участников',
                    'Добавить',
                    this._searchUsers.bind(this, login),
                    addChatUsers,
                );
            },
            onRemoveUserClick: () => {
                const username = () => this._getForm().getInput().value;

                this._initForm(
                    'Исключить участников',
                    'Исключить',
                    this._getChatUsers.bind(this, props.chatId, 0, 10, username),
                    deleteChatUsers,
                );
            },
            onLoadOld: () => {
                const from = this.getChatBubbles()!.getGroups()![0].getBubbles()![0].getProps().id;

                if (from) {
                    loadOldMessages(this.props.socket, from);
                }
            },
            onSendMessage: (e: Event) => {
                e.preventDefault();
                const messageBtn = this.refs.sendButtonRef as ButtonIcon;

                this._sendMessage(messageBtn);
            },
        });

        this._currentUserId = window.store.getState().user?.id;
    }

    private _messageTimeout?: NodeJS.Timeout;

    private _messageDelay: number = 700;

    private _sendMessage(messageBtn: ButtonIcon) {
        const messageInput = this.refs.messageInputRef as Input;
        const isValid = Input.validateFieldset([messageInput]);

        if (isValid && !messageBtn.disabled) {
            sendMessage(messageInput.value, this.props.socket);
            messageInput.value = '';
        }

        clearTimeout(this._messageTimeout!);

        messageBtn.setProps({ disabled: true });

        this._messageTimeout = setTimeout(() => {
            messageBtn.setProps({ disabled: false });
        }, this._messageDelay);
    }

    private _toggleActions() {
        const chatActions = this.refs.chatActionsRef as ChatActions;
        this._actionsVisible = !this._actionsVisible;

        if (this._actionsVisible) {
            chatActions.show();
        } else {
            chatActions.hide();
        }
    }

    private _initForm(
        title: string,
        submitText: string,
        getUsers: Callback<Promise<User[] | null>>,
        onSubmitChatRequest: Callback<Promise<{} | null>>,
    ) {
        const form = this.refs.chatActionFormRef as ChatActionForm;

        form.setProps({
            title,
            submitText,
            getUsers,
            onSubmit: () => {
                const selection = form.getSelected();
                if (selection) {
                    onSubmitChatRequest({ users: selection, chatId: this.props.chatId })
                        .then(() => this._getForm().submit())
                        .then(() => this._getForm().loadUsersList());
                }
            },
        });

        form.loadUsersList();
        form.show();
    }

    private _getForm(): ChatActionForm {
        return this.refs.chatActionFormRef as ChatActionForm;
    }

    private _searchUsers(login: () => string): Promise<User[] | null> {
        return searchUsers({
            login: login(),
        });
    }

    private _getChatUsers(chatId: number, offset: number = 0, limit: number = 10, name?: () => string, email: string = ''): Promise<User[] | null> {
        return getChatUsers({
            id: chatId,
            offset,
            limit,
            name: name ? name() : '',
            email,
        }).then((chatUsers) => (chatUsers
            ? chatUsers.filter((user) => user.id !== this._currentUserId)
            : null)) as Promise<User[] | null>;
    }

    private _chatUsernames: { [id: number]: string } = {};

    setMessages(messages: ChatMessage[], isOld: boolean = false) {
        const uniqueByUser = messages.filter((msg, i, self) =>
            self.findIndex(other => other.userId === msg.userId) === i
        );

        const promises = uniqueByUser.map(message => this.getMessageWithName(message))
        Promise.all<ChatMessage | null>(promises).then((results) => {
            results.forEach(message => {
                if (message)
                    this._chatUsernames[message.userId] = message.username;
            });

            const chatBubbles = this._transformMessagesToBubbles(messages);

            this.getChatBubbles().updateBubbles(chatBubbles, isOld);
        }).then(() => {
            this.getRef<Scroll>(this.refs.chatScrollRef)!.watch();
        });
    }

    private _transformMessagesToBubbles(messages: ChatMessage[]): BubbleProps[] {
        return messages.map((msg) => {
            return {
                isIn: msg.userId !== this._currentUserId,
                message: msg.content,
                time: dateFormat(msg.date),
                date: msg.date,
                userId: msg.userId,
                id: msg.id,
                name: this._chatUsernames[msg.userId],
            } as BubbleProps;
        });
    }

    getMessageWithName(message: ChatMessage) {
        return getUser(message.userId).then((user) => {
            if (user) {
                message.username = user.displayName ? user.displayName : user.login;
                return message;
            }
            else return null;
        });
    }

    getChatBubbles(): ChatBubbles {
        return this.getRef<Scroll>(this.refs.chatScrollRef)?.getScrollContent<ChatBubbles>()!;
    }

    getStub(): ChatStub {
        return this.refs.stubRef as ChatStub;
    }

    getHeader(): Header {
        return this.refs.chatHeaderRef as Header;
    }

    protected render() {
        console.log('render', this.constructor.name);

        // language=hbs
        return `
        <div class="chat whole">
            {{{Header 
                ref="chatHeaderRef"
                title=title
                rightBtnProps=moreBtnProps
            }}}
            {{{ChatActions 
                ref="chatActionsRef"
                onAddUserClick=onAddUserClick
                onRemoveUserClick=onRemoveUserClick
            }}}
            {{{ChatActionForm
                ref="chatActionFormRef"
            }}}
            {{{Scroll 
                ref="chatScrollRef"
                direction="${ScrollDirection.Reversed}"
                scrollContent="${ChatBubbles.componentName}"
                watchSelector=".bubble:first-of-type"
                onWatch=onLoadOld
            }}}
            <div class="chat__message-container">
                <form class="chat__message-wrapper">
                    <div class="chat__message-rows-wrapper">
                        <div class="chat__message-input-container">
                            <div class="chat__message-input-wrapper">
                                <div class="chat__input-container">
                                    {{{Input 
                                        ref="messageInputRef"
                                        validationType="${ValidationType.INPUT_MESSAGE}"
                                        name="message"
                                        type="text"
                                        onEnter=onSendMessage
                                        placeholder="Введите сообщние"
                                        onBlur=onBlur
                                    }}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat__button">
                        {{{ButtonIcon 
                            ref="sendButtonRef" 
                            onClick=onSendMessage 
                            type="submit" 
                            icon="${ButtonIcon.ICONS.SEND}"
                            color="${ButtonIcon.COLORS.WHITE}"
                        }}}
                    </div>
                </form>
            </div>
            {{{ChatStub 
                ref="stubRef"
            }}}
        </div>
    `;
    }
}
