import './newChatForm.css';
import { Block } from 'core';
import { ValidationType } from 'utils/validateValue';
import { Input } from 'components/input';

export interface NewChatFormProps extends Props {
    onFormSubmit?: Callback,
    onFormCancel?: Callback,
}

export default class NewChatForm extends Block<NewChatFormProps> {
    static readonly componentName: string = 'NewChatForm';

    constructor({ onFormCancel, ...props }: NewChatFormProps) {
        super({
            ...props,
            onFormCancel: onFormCancel || (() => this.hide()),
        });
    }

    getInput() : Input {
        return this.refs.titleInputRef as Input;
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="disabled">
                <div class="newchat screen whole content-center">
                    <form class="content-center newchat__form">
                        <div class="newchat__header">
                            Новый чат
                        </div>
                        <div class="newchat__input">
                            {{{Input 
                                ref="titleInputRef" 
                                name="title" 
                                type="text"
                                placeholder="Название чата"
                                validationType="${ValidationType.INPUT_LOGIN}"
                            }}}
                        </div>
                        <div class="newchat__footer">
                            <div class="newchat__button">
                                {{{ButtonPrimary 
                                    onClick=onFormSubmit 
                                    type="button" 
                                    text="Создать"
                                }}}
                            </div>
                            <div class="newchat__button">
                                {{{ButtonSecondary 
                                    onClick=onFormCancel 
                                    type="button" 
                                    text="Отмена"
                                }}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}
