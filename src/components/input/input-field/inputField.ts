import Block from 'core/Block';

import './inputField.css';

export interface InputFieldProps extends Props {
    name?: string;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    onBlur?: Callback;
    onFocus?: Callback;
    onInput?: Callback;
    onKeydown?: Callback;
}

export class InputField extends Block<InputFieldProps> {
    static readonly NAME: string = 'InputField';

    constructor({onInput, onFocus, onBlur, onKeydown, ...props }: InputFieldProps) {
        super({
            ...props,
            events: { 
                input: onInput,
                focus: onFocus,
                blur: onBlur,
                keydown: onKeydown
            }
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <input class="whole input__input" autocomplete="off" 
                name="{{name}}"
                type="{{type}}"
                placeholder="{{placeholder}}"
                {{#if value}}value="{{value}}"{{/if}}>
        `
    }
}