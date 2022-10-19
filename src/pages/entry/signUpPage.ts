import './entry.css';
import Block from 'core/Block';
import { renderDOM } from 'core';
import { Input } from 'components/input';
import { ValidationType } from 'utils/validateValue';
import { ErrorPage } from 'pages/error-page';
import SignInPage from './signInPage';

export default class SignUpPage extends Block {
    static readonly NAME = 'SignUpPage';

    constructor() {
        super({
            error: '',
            loginVal: '',
            passwordVal: '',
            onInput: () => {
                console.log('input');
            },
            onBlur: () => {
                console.log('blur');
            },
            onFocus: () => {
                console.log('focus');
            },
            onSubmit: (e: Event) => {
                e.preventDefault();

                const fieldset = this.refs.fieldsetRef as Input[];
                const password = this.refs.passwordRef as Input;
                const passwordRepeat = this.refs.passwordRepeatRef as Input;
                const inputSet = [...fieldset, password, passwordRepeat];

                const isValid = Input.fieldsetValidate(inputSet);

                if (isValid && password.value === passwordRepeat.value) {
                    renderDOM(new ErrorPage(ErrorPage.CODES[505]));
                } else {
                    passwordRepeat.setErrorMessage('пароли должны совпадать');
                }
            },
            onClick: () => {
                console.log('Has Account');
                renderDOM(new SignInPage());
            },
        });
    }

    protected render() {
        // language=hbs
        return `
        <div class="entry whole content-center">
            <form class="entry__form" action="">
                <div class="entry__header content-center">Регистрация</div>
                <div class="entry__fieldset content-center">
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_EMAIL}"
                            ref="fieldsetRef"
                            name="email"
                            type="text"
                            placeholder="Почта"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_LOGIN}"
                            ref="fieldsetRef"
                            name="login"
                            type="text"
                            placeholder="Логин"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_FIRST_NAME}"
                            ref="fieldsetRef"
                            name="first_name"
                            type="text"
                            placeholder="Имя"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_SECOND_NAME}"
                            ref="fieldsetRef"
                            name="second_name"
                            type="text"
                            placeholder="Фамилия"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PHONE}"
                            ref="fieldsetRef"
                            name="phone"
                            type="text"
                            placeholder="Телефон"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRef"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRepeatRef"
                            name="repeat_password"
                            type="password"
                            placeholder="Пароль (еще раз)"
                            onInput=onInput
                            onFocus=onFocus
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
