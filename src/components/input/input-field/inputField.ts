import './inputField.css';
import Block from 'core/Block';

export interface InputFieldProps extends Props {
    name?: string;
    type?: 'text' | 'password' | 'email' | 'file';
    placeholder?: string;
    value?: string;
    accept?: string;
    onBlur?: Callback;
    onFocus?: Callback;
    onInput?: Callback;
    onKeydown?: Callback;
    display?: 'inline-block' | 'none';
    id? : string;
}

export default class InputField extends Block<InputFieldProps> {
    static readonly componentName: string = 'InputField';

    constructor({
        onInput, onFocus, onBlur, onKeydown, display = 'inline-block', ...props
    }: InputFieldProps) {
        super({
            ...props,
            display,
            events: {
                input: onInput,
                focus: onFocus,
                blur: onBlur,
                keydown: onKeydown,
            },
        });
    }

    protected render(): string {
        const display = `display: ${this.props.display}`;  

        // language=hbs
        return `
            <input style="${display}" class="whole input__input" autocomplete="off" 
                name="{{name}}"
                type="{{type}}"
                placeholder="{{placeholder}}"
                {{#if id}}id="{{id}}"{{/if}}
                {{#if accept}}accept="{{accept}}"{{/if}}
                {{#if value}}value="{{value}}"{{/if}}>
        `;
    }
}
