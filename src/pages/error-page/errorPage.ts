import './errorPage.css';
import { Block, CoreRouter, Store } from 'core';
import { Screens, withRouter, withStore } from 'utils';

type ErrorPageProps = {
    router: CoreRouter,
    store: Store<AppState>,
    text?: string,
    onClick?: Callback,
};

export class ErrorPage extends Block<ErrorPageProps> {
    static readonly componentName = 'ErrorPage';

    constructor({...props }: ErrorPageProps) {
        super({
            ...props,
            text: 'Вернуться на главную',
            onClick: () => this.props.router.go(Screens.Messenger),
        });
    }

    protected render() {
        const state = this.props.store.getState();
        // language=hbs
        return `
        <div class="screen content-center back-panel">
            <div class="error-container">
                {{{Error 
                    code="${state.apiError?.status ?? 404}" 
                    description="${state.apiError?.reason ?? 'Не туда попали'}"
                }}}
                {{{ButtonSecondary onClick=onClick type="button" text=text}}}
            </div>    
        </div>
    `;
    }
}
export default withRouter(withStore(ErrorPage));