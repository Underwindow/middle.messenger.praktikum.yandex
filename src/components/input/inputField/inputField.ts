import Block from 'core/Block';

import './inputField.css';

export interface InputFieldProps {
    name?: string;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onInput?: () => void;
}

export class InputField extends Block {
    static NAME: string = 'InputField';

    constructor({onInput, onFocus, onBlur, ...props }: InputFieldProps) {
        super({
            ...props,
            events: { 
                input: onInput,
                focus: onFocus,
                blur: onBlur 
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