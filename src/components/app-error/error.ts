import './error.css';
import { Block } from 'core';

export interface ErrorProps extends Props {
    code?: string,
    description?: string,
}

export default class Error extends Block<ErrorProps> {
    static readonly componentName: string = 'Error';

    protected render(): string {
        // language=hbs
        return `
        <div class="error">
            <h1 class="error__code">{{code}}</h1>
            <h1 class="error__description">{{description}}</h1>
        </div>
        `;
    }
}
