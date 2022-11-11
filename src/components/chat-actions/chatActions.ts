import './chatActions.css';
import { Block } from 'core';
import { ButtonIcon } from 'components/button';

export interface ChatActionsProps extends Props {
    isAdmin: boolean,
    onAddUserClick: Callback,
    onRemoveUserClick: Callback,
    onDeleteChatClick: Callback,
}

export default class ChatActions extends Block<ChatActionsProps> {
    static readonly componentName: string = 'ChatActions';

    protected render(): string {
        // language=hbs
        return `
        <div class="disabled chat__actions">
            <div class="chat-actions-container">
                <div class="chat-actions__button">
                    {{{ButtonIcon 
                        ref="addUserButtonRef" 
                        type="button" 
                        icon="${ButtonIcon.ICONS.PERSON_ADD}"
                        color="${ButtonIcon.COLORS.HINT}"
                        onClick=onAddUserClick
                    }}}
                </div>
                <div class="chat-actions__button">
                    {{{ButtonIcon 
                        ref="removeUserButtonRef" 
                        type="button" 
                        icon="${ButtonIcon.ICONS.PERSON_REMOVE}"
                        color="${ButtonIcon.COLORS.HINT}"
                        onClick=onRemoveUserClick
                    }}}
                </div>
                {{#if isAdmin}}
                <div class="chat-actions__button">
                    {{{ButtonIcon 
                        ref="deleteChat" 
                        type="button" 
                        icon="${ButtonIcon.ICONS.DELETE}"
                        color="${ButtonIcon.COLORS.ERROR}"
                        onClick=onDeleteChatClick
                    }}}
                </div>
                {{/if}}
            </div>
        </div>
        `;
    }
}
