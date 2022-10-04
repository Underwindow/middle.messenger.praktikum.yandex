import Block from 'core/Block';

import './inputError.css';

export interface InputErrorProps {
    text?: string
}

export class InputError extends Block {
    static NAME: string = 'InputError';

    constructor(props: InputErrorProps) {
        super({ ...props });
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