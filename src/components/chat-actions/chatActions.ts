import './chatActions.css';
import Block from 'core/Block';
import { ButtonIcon } from 'components/button/button-icon';

export interface ChatActionsProps extends Props {
    onAddUserClick?: Callback
    onRemoveUserClick?: Callback
}

export default class ChatActions extends Block<ChatActionsProps> {
    static readonly componentName: string = 'ChatActions';

    protected render(): string {
        // language=hbs
        return `
        <div class="disabled chat-actions-container">
            <div class="chat-actions__buton">
                {{{ButtonIcon 
                    ref="addUserButtonRef" 
                    type="button" 
                    icon="${ButtonIcon.ICONS.PERSON_ADD}"
                    color="${ButtonIcon.COLORS.HINT}"
                    onClick=onAddUserClick
                }}}
            </div>
            <div class="chat-actions__buton">
                {{{ButtonIcon 
                    ref="removeUserButtonRef" 
                    type="button" 
                    icon="${ButtonIcon.ICONS.PERSON_REMOVE}"
                    color="${ButtonIcon.COLORS.HINT}"
                    onClick=onRemoveUserClick
                }}}
            </div>
        </div>
        `;
    }
}
