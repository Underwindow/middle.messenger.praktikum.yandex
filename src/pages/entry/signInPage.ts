import Block from 'core/Block';
import Messenger from 'pages/messenger';
import { renderDOM } from 'core';
import Input from 'components/input';
import { ValidationType } from 'helpers/validateValue';
import { SignUpPage } from './signUpPage';
import ErrorPage from 'pages/error-page';

import './entry.css';

export class SignInPage extends Block {
    static readonly NAME = 'SignInPage';
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
                
                const login = this.refs.loginRef as Input;
                const password = this.refs.passwordRef as Input;
                const inputSet = [login, password];
                
                const success = Input.fieldsetValidate(inputSet);

                if (success) {
                    console.log('Validation success');
                    renderDOM(new ErrorPage(ErrorPage.CODES[404]));
                }
                else {
                    console.log('Validation failed');
                }
            },
            onClick: () => {
                console.log('No Account');                
                renderDOM(new SignUpPage);
            }
        });
    }

    render() {
        console.log('render', SignInPage.NAME, this.children);

        // language=hbs
        return `
        <div class="entry whole content-center">
            <form class="entry__form" action="">
                <div class="entry__header content-center">Вход</div>
                <div class="entry__fieldset content-center">
                    <div class="entry__input">
                        {{{Input 
                            validationType="${ValidationType.INPUT_LOGIN}"
                            ref="loginRef"
                            name="login"
                            type="text"
                            placeholder="Логин"
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