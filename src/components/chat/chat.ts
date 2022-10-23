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
import { addChatUsers, deleteChatUsers, getChatUsers, searchUsers, sendMessage } from 'services';

interface ChatProps extends Props {
    chatId: number,
    socket: WebSocket,
    title: string,
    avatar: string,
    moreBtnProps: ButtonIconProps,
    onAddUserClick?: Callback,
    onRemoveUserClick?: Callback,
    onSendMessage: Callback,
};

export default class Chat extends Block<ChatProps> {
    static readonly componentName = 'Chat';

    private _currentUserId: number | undefined;
    private _actionsVisible: boolean = false;
    private _messageDelay: number = 700;

    constructor(props: ChatProps) {
        super(props);

        this._currentUserId = window.store.getState().user?.id;

        const moreBtnProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.MORE_VERT,
            onClick: () => this._toggleActions(),
        };

        this.setProps({
            moreBtnProps,
            onAddUserClick: () => {
                const login = () => this._getForm().getInput().value;

                this._initForm(
                    'Добавить участников',
                    'Добавить',
                    this._searchUsers.bind(this, login),
                    addChatUsers
                );
            },
            onRemoveUserClick: () => {
                const username = () => this._getForm().getInput().value;

                this._initForm(
                    'Исключить участников',
                    'Исключить',
                    this._getChatUsers.bind(this, props.chatId, 0, 10, username),
                    deleteChatUsers
                );
            },
            onSendMessage: (e: Event) => {
                e.preventDefault();

                const sendButton = this.refs.sendButtonRef as ButtonIcon;
                sendButton.setProps({ disabled: true });
                
                const messageInput = this.refs.messageInputRef as Input;

                const isValid = Input.validateFieldset([messageInput]);

                if (isValid) {
                    sendMessage(messageInput.value, this.props.socket);
                    messageInput.value = '';
                }
                setTimeout(() => {
                    sendButton.setProps({ disabled: false });
                }, this._messageDelay);
            },
        });
    }

    private _toggleActions() {
        const chatActions = this.refs.chatActionsRef as ChatActions;
        this._actionsVisible = !this._actionsVisible;

        if (this._actionsVisible) {
            chatActions.show()
        } else {
            chatActions.hide();
        }
    }

    private _initForm(title: string, submitText: string,
        getUsers: Callback<Promise<User[] | null>>,
        onSubmitChatRequest: Callback<Promise<{} | null>>) {

        const form = this.refs.chatActionFormRef as ChatActionForm;

        form.setProps({
            title: title,
            submitText: submitText,
            getUsers: getUsers,
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

    private _searchUsers(login?: () => string): Promise<User[] | null> {
        return searchUsers({
            login: login ? login() : ''
        });
    }

    private _getChatUsers(chatId: number, offset: number = 0, limit: number = 10, name?: () => string, email: string = ''): Promise<User[] | null> {
        return getChatUsers({
            id: chatId,
            offset: offset,
            limit: limit,
            name: name ? name() : '',
            email: email
        }).then((chatUsers) => {
            return chatUsers
                ? chatUsers.filter(user => user.id !== this._currentUserId)
                : null;
        }) as Promise<User[] | null>;
    }

    getBubbles(): ChatBubbles {
        return this.refs.chatBubblesRef as ChatBubbles;
    }

    getStub(): ChatStub {
        return this.refs.stubRef as ChatStub;
    }

    getHeader(): Header {
        return this.refs.chatHeader as Header;
    }

    protected render() {
        console.log('render', this.constructor.name);

        // language=hbs
        return `
        <div class="chat whole">
            {{{Header 
                ref="chatHeader"
                title=title
                rightBtnProps=moreBtnProps
            }}}
            <div class="chat__actions">
                {{{ChatActions 
                    ref="chatActionsRef"
                    onAddUserClick=onAddUserClick
                    onRemoveUserClick=onRemoveUserClick
                }}}
            </div>
            {{{ChatActionForm
                ref="chatActionFormRef"
            }}}
            <div class="chat__bubbles-container">
                <div class="scrollable-y">
                    {{{ChatBubbles ref="chatBubblesRef"}}}
                </div>
            </div>
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
            {{{ChatStub ref="stubRef"}}}
        </div>
    `;
    }
}
