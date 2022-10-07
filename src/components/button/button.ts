import Block from '../../core/Block';
// import template from 'bundle-text:./template.hbs';

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
    constructor({ onClick, disabled, ...props }: ButtonProps) {
        super({ ...props, disabled, events: { click: onClick } });
    }

    protected render(): string {
        console.log('render', this.constructor.name, this.id);

        return `
        <button class="{{class}}" name="{{name}}" type="{{type}}" {{#if disabled}}disabled="true"{{/if}}">
            {{text}}
        </button>
        `;
    }
}
