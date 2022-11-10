import './button.css';
import { Block } from 'core';

export interface ButtonProps extends Props {
    class?: string,
    name?: string,
    type?: 'submit' | 'button' | 'reset',
    text?: string,
    color?: string,
    disabled?: boolean,
    onClick?: Callback,
}

export default abstract class Button extends Block<ButtonProps> {
    constructor({ onClick, disabled = false, ...props }: ButtonProps) {
        super({ ...props, disabled, events: { click: onClick } });
    }

    protected render(): string {
        return `
        <button class="{{class}}" name="{{name}}" type="{{type}}" style="color: {{color}}" {{#if disabled}}disabled="true"{{/if}}>
            {{text}}
        </button>
        `;
    }

    get disabled() : boolean {
        return this.props.disabled!;
    }
}
