import { Block } from 'core';
import { UserListItem, UserListItemProps } from 'components/user-list-item';

export interface UserListProps extends Props {
    usersList?: UserListItemProps[],
}

export default class UserList extends Block<UserListProps> {
    static readonly componentName: string = 'UserList';

    constructor(props: UserListProps) {
        super(props);
    }

    getUsersList() {
        return Array.isArray(this.refs.usersListRef)
            ? this.refs.usersListRef as UserListItem[]
            : [this.refs.usersListRef as UserListItem];
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="scrollable-y">
            {{#each usersList}}
                {{#with this}}
                    {{{UserListItem
                        ref="usersListRef"
                        userId=userId
                        login=login
                        avatar=avatar
                        onClick=onClick
                    }}}
                {{/with}}                
            {{/each}}
        </div>
        `;
    }
}
