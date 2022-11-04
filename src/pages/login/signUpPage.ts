import './login.css';
import { Block, CoreRouter, Store } from 'core';
import { Screens, withRouter, withStore } from 'utils';
import { ValidationType } from 'utils/validateValue';
import { signUp } from 'services';
import { SignUpRequestData } from 'api';
import { Input } from 'components/input';

type SignUpPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    onSubmit: Callback,
    onClick: Callback,
};

export class SignUpPage extends Block<SignUpPageProps> {
    static readonly componentName = 'SignUpPage';

    constructor(props: SignUpPageProps) {
        super(props);

        this.setProps({
            onSubmit: (e: Event) => {
                e.preventDefault();
                this.getStateFromProps();

                const fieldset = this.refs.fieldsetRef as Input[];
                const password = this.refs.passwordRef as Input;
                const passwordRepeat = this.refs.passwordRepeatRef as Input;
                const isValid = Input.validateFieldset([...fieldset, password, passwordRepeat]);

                if (isValid) {
                    if (password.value === passwordRepeat.value) {
                        this.props.store.dispatch(signUp, this.state.signUpData);
                    } else {
                        passwordRepeat.setErrorMessage('пароли должны совпадать');
                    }
                }
            },
            onClick: () => {
                this.props.store.dispatch({ loginFormError: null });
                this.props.router.go(Screens.SignIn);
            },
        });
    }

    protected getStateFromProps() {
        const nextState = {
            signUpData: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                password: '',
            },
            repeatPassword: '',
        };

        if ((this.refs.passwordRef as Input)) {
            const fieldset = [...this.refs.fieldsetRef as Input[], this.refs.passwordRef as Input];
            const pwdRepeatInput = this.refs.passwordRepeatRef as Input;

            const signUpData = Input.trasformFieldset<SignUpRequestData>(fieldset);

            nextState.signUpData = signUpData;
            nextState.repeatPassword = pwdRepeatInput.value;
        }

        this.setState(nextState);
    }

    protected render() {
        const values = this.state.signUpData as SignUpRequestData;
        const { repeatPassword } = this.state;

        // language=hbs
        return `
        <div class="entry whole content-center">
            <form class="entry__form" action="">
                <div class="entry__header content-center">Регистрация</div>
                <div class="entry__fieldset content-center">
                    <div class="entry__error content-center color-error">
                        {{formError}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.email}"
                            validationType="${ValidationType.INPUT_EMAIL}"
                            ref="fieldsetRef"
                            name="email"
                            type="text"
                            placeholder="Почта"
                            onEnter=onSubmit
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.login}"
                            validationType="${ValidationType.INPUT_LOGIN}"
                            ref="fieldsetRef"
                            name="login"
                            type="text"
                            placeholder="Логин"
                            onEnter=onSubmit
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.first_name}"
                            validationType="${ValidationType.INPUT_FIRST_NAME}"
                            ref="fieldsetRef"
                            name="first_name"
                            type="text"
                            placeholder="Имя"
                            onEnter=onSubmit
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.second_name}"
                            validationType="${ValidationType.INPUT_SECOND_NAME}"
                            ref="fieldsetRef"
                            name="second_name"
                            type="text"
                            placeholder="Фамилия"
                            onEnter=onSubmit
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${values.phone}"
                            validationType="${ValidationType.INPUT_PHONE}"
                            ref="fieldsetRef"
                            name="phone"
                            type="text"
                            placeholder="Телефон"
                            onEnter=onSubmit
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
                            onEnter=onSubmit
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            value="${repeatPassword}"
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRepeatRef"
                            name="repeat_password"
                            type="password"
                            placeholder="Пароль (еще раз)"
                            onEnter=onSubmit
                        }}}
                    </div>
                </div>
                <div class="entry__footer content-center">
                    <div class="entry__button">
                        {{{ButtonPrimary onClick=onSubmit type="submit" text="Создать аккаунт"}}}
                    </div>
                    <div class="entry__button">
                        {{{ButtonSecondary onClick=onClick type="button" text="Войти"}}}
                    </div>
                </div>
            </form>
        </div>`;
    }
}

export default withRouter(withStore(SignUpPage));
