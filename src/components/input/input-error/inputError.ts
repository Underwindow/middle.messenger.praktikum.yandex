import Block from 'core/Block';

import './inputError.css';

export interface InputErrorProps extends Props {
    text?: string
}

export class InputError extends Block<InputErrorProps> {
    static NAME: string = 'InputError';

    constructor(props: InputErrorProps) {
        super({ ...props });
    }

    protected render(): string {
        console.log('render', this.constructor.name, this.id);

        // language=hbs
        return `
        <div class="input__error">
            <div class="input__error-text">{{text}}</div>
        </div>
        `;
    }
}