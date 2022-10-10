import './inputError.css';
import Block from 'core/Block';

export interface InputErrorProps extends Props {
    text?: string
}

export default class InputError extends Block<InputErrorProps> {
    static NAME = 'InputError';

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
