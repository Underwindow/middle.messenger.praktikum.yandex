import Block from 'core/Block';
import { validateData, ValidationType } from 'helpers/validateForm';

import './input.css';
import InputError from './inputError';
import { InputFieldProps } from './inputField/inputField';

export interface InputProps extends InputFieldProps {
    icon?: string;
    validationType: ValidationType;
}



export class Input extends Block {
    static readonly NAME: string = 'Input';
    static readonly INVALID_CLASS_NAME = 'input-invalid';
    constructor({ validationType, ...props }: InputProps) {
        super({
            ...props,
            validationType,
            error: '',
            onInput: (e: FocusEvent) => {
                const inputEl = e.target as HTMLInputElement;

                const errorMessage = validateData(validationType, inputEl.value);
                const errorRef = this.refs.errorRef as InputError;

                if (errorMessage) {
                    errorRef.setProps({ text: errorMessage });
                }
                else {
                    console.log(validationType, 'success');
                    errorRef.setProps({ text: '' });
                }
                
            }
        });
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="input back-panel">
            <div class="input__icon-container">
                {{#if icon}}
                    <i class="input__icon material-icons">{{icon}}</i>
                {{/if}}
            </div>
            {{{InputField 
                name=name 
                type=type
                placeholder=placeholder
                value=value
                onInput=onInput
                onFocus=onFocus
                onBlur=onBlur
            }}}
            {{{InputError ref="errorRef" text=text}}}
        </div>
        `
    }
}