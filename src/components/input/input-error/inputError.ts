import './inputError.css';
import { Block } from 'core';

export interface InputErrorProps extends Props {
    text?: string,
}

export default class InputError extends Block<InputErrorProps> {
    static readonly componentName = 'InputError';

    constructor(props: InputErrorProps) {
        super(props);
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="input__error">
            <div class="input__error-text">{{text}}</div>
        </div>
        `;
    }
}
