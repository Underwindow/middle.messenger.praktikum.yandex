import Block from 'core/Block';

import './error.css';

interface ErrorProps {
    code?: string
    description?: string
    text?: string
    onClick?: Callback
}

export class Error extends Block {
    static NAME: string = 'Error';

    constructor({onClick, ...props }: ErrorProps) {
        super({ 
            ...props,
            events: { 
                click: onClick
            } 
        });
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="error-message-container">
            <h1 class="error-code">{{code}}</h1>
            <h1 class="error-text">{{description}}</h1>
            <button style="text-align: center;" class="clear-btn color-hint">{{text}}</button>
        </div>
        `
    }
}