import './login.css';
import Block from 'core/Block';
import { CoreRouter, Store } from 'core';
import { Input } from 'components/input';
import { ValidationType } from 'utils/validateValue';
import { login } from 'services';
import { Screens, withRouter, withStore } from 'utils';
import { LoginRequestData } from 'api';

type SignInPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    onSubmit: Callback,
    onClick: Callback,
};

export class SignInPage extends Block<SignInPageProps> {
    static readonly componentName = 'SignInPage';

    constructor(props: SignInPageProps) {
        super(props);

        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            onSubmit: (e: Event) => {
                e.preventDefault();

                this.getStateFromProps();

                const loginInput = this.refs.loginRef as Input;
                const passwordInput = this.refs.passwordRef as Input;
                const isValid = Input.validateFieldset([loginInput, passwordInput]);

                if (isValid) {
                    this.props.store.dispatch(login, this.state.loginData);
                }
            },
            onClick: () => {
                this.props.store.dispatch({ loginFormError: null });
                this.props.router.go(Screens.SignUp);
            },
        });
    }

    protected getStateFromProps() {
        const nextState = {
            loginData: {
                login: '',
                password: '',
            },
        };

        const loginInput = this.refs.loginRef as Input;
        const passwordInput = this.refs.passwordRef as Input;

        const loginData = {
            login: loginInput?.value ?? '',
            password: passwordInput?.value ?? '',
        } as LoginRequestData;

        nextState.loginData = loginData;

        this.setState(nextState);
    }

    protected render() {
        const values = this.state.loginData as LoginRequestData;

        // language=hbs
        return `
        <div class="entry whole content-center">
            <form class="entry__form" action="">
                <div class="entry__header content-center">Вход</div>
                <div class="entry__fieldset content-center">
                    <div class="entry__error content-center color-error">
                        {{formError}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.login}"
                            validationType="${ValidationType.INPUT_LOGIN}"
                            ref="loginRef"
                            name="login"
                            type="text"
                            placeholder="Логин"
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.password}"
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRef"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                        }}}
                    </div>
                </div>
                <div class="entry__footer content-center">
                    <div class="entry__button">
                        {{{ButtonPrimary onClick=onSubmit type="submit" text="Войти"}}}
                    </div>
                    <div class="entry__button">
                        {{{ButtonSecondary onClick=onClick type="button" text="Нет аккаунта?"}}}
                    </div>
                </div>
            </form>
        </div>`;
    }
}

export default withRouter(withStore(SignInPage));
