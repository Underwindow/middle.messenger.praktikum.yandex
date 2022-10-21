import './errorPage.css';
import Block from 'core/Block';
import { Messenger } from 'pages/messenger';
import { renderDOM } from 'core';
import { ErrorProps } from 'components/app-error/error';

export default class ErrorPage extends Block<ErrorProps> {
    static readonly componentName = 'ErrorPage';

    static readonly CODES = {
        404: {
            code: '404',
            description: 'Не туда попали',
        } as ErrorProps,
        505: {
            code: '5**',
            description: 'Что-то пошло не так',
        } as ErrorProps,
    };

    constructor({ ...props }: ErrorProps) {
        super({ 
            ...props,
            text: 'Вернуться на главную',
            onClick: () => renderDOM(new Messenger()),
        });
    }

    protected render() {
        // language=hbs
        return `
        <div class="screen content-center back-panel">
            <div class="error-container">
                {{{Error code=code description=description}}}
                {{{ButtonSecondary onClick=onClick type="button" text=text}}}
            </div>    
        </div>
    `;
    }
}
