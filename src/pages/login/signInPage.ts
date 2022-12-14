import './login.css';
import { Block, CoreRouter, Store } from 'core';
import { Screens, withRouter, withStore } from 'utils';
import { ValidationType } from 'utils/validateValue';
import { login } from 'services';
import { LoginRequestData } from 'api';
import { Input } from 'components/input';

interface SignInPageProps extends Props {
    router: CoreRouter,
    store: Store<AppState>,
    formError?: () => string | null,
    onSubmit: Callback,
    onClick: Callback,
}

export class SignInPage extends Block<SignInPageProps> {
    static readonly componentName = 'SignInPage';

    constructor(props: SignInPageProps) {
        super(props);

        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            onClick: () => {
                this.props.store.dispatch({ screen: Screens.SignUp, loginFormError: null });
            },
            events: {
                submit: (e: Event) => {
                    e.preventDefault();

                    this.getStateFromProps();

                    const loginInput = this.refs.loginRef as Input;
                    const passwordInput = this.refs.passwordRef as Input;
                    const isValid = Input.validateFieldset([loginInput, passwordInput]);

                    if (isValid) {
                        this.props.store.dispatch(login, this.state.loginData);
                    }
                },
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
        <div data-testid="sign-in-screen" class="entry whole content-center">
            <form class="entry__form" action="">
                <div class="entry__header content-center">????????</div>
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
                            placeholder="??????????"
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.password}"
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRef"
                            name="password"
                            type="password"
                            placeholder="????????????"
                        }}}
                    </div>
                </div>
                <div class="entry__footer content-center">
                    <div class="entry__button">
                        {{{ButtonPrimary type="submit" text="??????????"}}}
                    </div>
                    <div class="entry__button">
                        {{{ButtonSecondary onClick=onClick type="button" text="?????? ?????????????????"}}}
                    </div>
                </div>
            </form>
        </div>`;
    }
}

export default withRouter(withStore(SignInPage));
