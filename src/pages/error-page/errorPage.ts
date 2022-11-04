import './errorPage.css';
import { Block, CoreRouter, Store } from 'core';
import { ErrorProps } from 'components/app-error/error';
import { Screens, withRouter, withStore } from 'utils';

type ErrorPageProps = {
    router: CoreRouter,
    store: Store<AppState>,
    error: ErrorProps,
    text?: string,
    onClick?: Callback,
};

export class ErrorPage extends Block<ErrorPageProps> {
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

    constructor({ error = ErrorPage.CODES[404], ...props }: ErrorPageProps) {
        super({
            ...props,
            error,
            text: 'Вернуться на главную',
            onClick: () => this.props.router.go(Screens.Messenger),
        });
    }

    protected render() {
        // language=hbs
        return `
        <div class="screen content-center back-panel">
            <div class="error-container">
            {{#with error}}
                {{{Error code=code description=description}}}
            {{/with}}
                {{{ButtonSecondary onClick=onClick type="button" text=text}}}
            </div>    
        </div>
    `;
    }
}
export default withRouter(withStore(ErrorPage));