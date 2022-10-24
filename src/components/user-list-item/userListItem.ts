import { Block } from 'core';
import './userListItem.css';

export interface UserListItemProps extends Props {
    userId?: number,
    login?: string,
    avatar?: string,
    selected?: string,
    onClick?: Callback,
}

export default class UserListItem extends Block<UserListItemProps> {
    static readonly componentName: string = 'UserListItem';

    static readonly activeClassName: string = 'item-active__text';

    constructor(props: UserListItemProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    getLogin(): string | undefined {
        return this.props.login;
    }

    getId(): number | undefined {
        return this.props.userId;
    }

    setActive(value = true) {
        const active = this.props.selected ? false : value;

        this.props.selected = active ? UserListItem.activeClassName : '';
    }

    protected render(): string {
        // language=hbs
        return `
        <button type="button" class="clear-btn user-list-item {{selected}}">
            {{#if selected}}
            <div class="user-list-item__active-hint"></div>
            {{/if}}
            {{{Avatar src=avatar }}}
            <div class="user-list-item__caption">
                <p class="user-list-item__title">
                    <span class="user-list-item__name">{{login}}</span>
                </p>
            </div>
        </button>
        `;
    }
}
