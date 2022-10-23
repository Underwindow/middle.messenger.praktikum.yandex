import { Block } from 'core';
import './button.css';

export default interface ButtonProps extends Props {
    class?: string
    name?: string
    type?: 'submit' | 'button' | 'reset'
    text?: string
    disabled?: boolean
    onClick?: Callback
}

export abstract class Button extends Block<ButtonProps> {
    constructor({ onClick, onBlur, disabled, ...props }: ButtonProps) {
        super({ ...props, disabled, events: { click: onClick } });
    }

    protected render(): string {
        return `
        <button class="{{class}}" name="{{name}}" type="{{type}}" {{#if disabled}}disabled="true"{{/if}}">
            {{text}}
        </button>
        `;
    }
}
