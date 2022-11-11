import './chatActionForm.css';
import { Block } from 'core';
import { ValidationType } from 'utils/validateValue';
import { Input } from 'components/input';
import { UserListItemProps } from 'components/user-list-item/userListItem';
import { UserList } from 'components/user-list';
import { Button } from 'components/button';

export interface ChatActionFormProps extends Props {
    title: string,
    submitText: string,
    usersList: UserListItemProps[],
    getUsers: Callback<Promise<User[] | null>>,
    onSubmit: Callback,
}

export default class ChatActionForm extends Block<ChatActionFormProps> {
    static readonly componentName: string = 'ChatActionForm';

    constructor(props: ChatActionFormProps) {
        super({
            ...props,
            onSearch: () => {
                const searchInput = this.refs.searchInputRef as Input;

                clearTimeout(this._inputTimeout!);

                this._inputTimeout = setTimeout(() => {
                    const errorMessage = searchInput.validate();

                    if (!errorMessage) {
                        this.loadUsersList();
                    }
                }, this._inputDelay);
            },
            onClose: () => {
                this._selectedItems = [];
                this._updateUsersList();
                this.hide();
            },
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (this._selectedItems) {
                        this.props.onSubmit();
                    }
                },
            },
        });
    }

    private _inputTimeout?: NodeJS.Timeout;

    private _inputDelay: number = 700;

    private _selectedItems: number[] = [];

    private _updateUsersList(users: User[] = []) {
        const usersList = users.map((user) => {
            const userListItem: UserListItemProps = {
                userId: user.id,
                login: user.login,
                avatar: user.avatar,
                onClick: () => {
                    this._selectUser(user);
                    this._updateButton();
                },
            };
            return userListItem;
        });

        const userListRef = this.refs.userListRef as UserList;

        userListRef.setProps({ usersList });

        this._selectedItems.forEach((id) => {
            userListRef.getUsersList().find((userItem) => userItem.getId() === id)
                ?.setActive(true);
        });
    }

    private _updateButton() {
        const submitBtn = this.refs.submitButtonRef as Button;
        submitBtn.setProps({
            text: `${this.props.submitText}${this._selectionCount()}`,
        });
    }

    private _selectUser(user: User) {
        const userListRef = this.refs.userListRef as UserList;
        const usersList = userListRef.getUsersList();
        const index = this._selectedItems.indexOf(user.id);
        const userSelected = index > -1;

        if (userSelected) this._selectedItems.splice(index, 1);
        else this._selectedItems.push(user.id);

        usersList.find((userItem) => userItem.getId() === user.id)
            ?.setActive(!userSelected);

        console.log(this._selectedItems);
    }

    loadUsersList() {
        this.props.getUsers().then((users) => {
            if (users) {
                this._updateUsersList(users);
            }
        });
    }

    getSelected = () => this._selectedItems;

    getInput(): Input {
        return this.refs.searchInputRef as Input;
    }

    submit() {
        this._selectedItems = [];
        this._updateButton();
        this._updateUsersList();
    }

    private _selectionCount() {
        return (this._selectedItems?.length ?? 0) === 0
            ? ''
            : ` ${this._selectedItems.length}`;
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="absolute disabled">
                <div class="chat-action-form whole content-center">
                    <form class="content-center chat-action-form__form">
                        <div class="chat-action-form__header">
                            {{title}}
                        </div>
                        <div class="chat-action-form__input">
                            {{{Input
                                ref="searchInputRef"
                                type="text"
                                placeholder="Поиск по логину"
                                onInput=onSearch
                                validationType="${ValidationType.INPUT_LOGIN_SEARCH}"
                            }}}
                        </div>
                        <div class="chat-action-form__users-list">
                            {{{UserList
                                ref="userListRef"
                            }}}
                        </div>
                        <div class="chat-action-form__footer">
                            <div class="chat-action-form__button">
                                {{{ButtonPrimary
                                    ref="submitButtonRef"
                                    type="submit"
                                    text=submitText
                                }}}
                            </div>
                            <div class="chat-action-form__button">
                                {{{ButtonSecondary
                                    onClick=onClose
                                    type="button"
                                    text="Закрыть"
                                }}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}
