import Block from 'core/Block';
import Messenger from 'pages/messenger';
import { renderDOM } from 'core';
import { ErrorProps } from 'components/app-error/error';

import './error.css';

export interface ErrorPageProps extends ErrorProps {
    text: string,
    onClick: Callback
}

export class ErrorPage extends Block<ErrorPageProps> {
    static readonly CODES = {
        404: {
            code: '404',
            description: 'Не туда попали',
            text: 'Вернуться на главную',
            onClick: () => renderDOM(new Messenger())
        } as ErrorPageProps,
        505: {
            code: '5**',
            description: 'Что-то пошло не так',
            text: 'Вернуться на главную',
            onClick: () => renderDOM(new Messenger())
        } as ErrorPageProps
    };

    constructor({ ...props }: ErrorPageProps) {
        super(props);
    }

    render() {
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