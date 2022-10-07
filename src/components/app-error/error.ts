import Block from 'core/Block';

import './error.css';

export interface ErrorProps extends Props {
    code?: string
    description?: string
}

export class Error extends Block<ErrorProps> {
    static readonly NAME: string = 'Error';

    constructor({ ...props }: ErrorProps) {
        super(props);
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="error">
            <h1 class="error__code">{{code}}</h1>
            <h1 class="error__description">{{description}}</h1>
        </div>
        `
    }
}