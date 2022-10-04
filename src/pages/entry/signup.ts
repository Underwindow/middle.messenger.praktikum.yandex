import Block from 'core/Block';
import Messenger from 'pages/messenger';
import { renderDOM } from 'core';

import './entry.css';
import Input from 'components/input';
import { ValidationType } from 'helpers/validateForm';

export class SignUpPage extends Block {
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
            onSubmit: () => {
                const loginRef = this.refs.login as Input;
            }
        });
    }

    render() {
        console.log('render', SignUpPage.NAME, this.children);

        // language=hbs
        return `
        <div class="whole content-center">
            <form class="entry-container" action="">
                <div class="entry-header content-center">Регистрация</div>
                <div class="entry-input-list content-center">
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_EMAIL}"
                            ref="email"
                            name="email"
                            type="text"
                            placeholder="Почта"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_LOGIN}"
                            ref="login"
                            name="login"
                            type="text"
                            placeholder="Логин"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_FIRST_NAME}"
                            ref="firstName"
                            name="first_name"
                            type="text"
                            placeholder="Имя"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_SECOND_NAME}"
                            ref="secondName"
                            name="second_name"
                            type="text"
                            placeholder="Фамилия"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PHONE}"
                            ref="phone"
                            name="phone"
                            type="text"
                            placeholder="Телефон"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            validationType="${ValidationType.INPUT_PASSWORD}"
                            ref="passwordRepeat"
                            name="repeat_password"
                            type="password"
                            placeholder="Пароль (еще раз)"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                    </div>
                </div>
                <dir class="entry-footer content-center">
                    <button class="clear-btn entry-submit-btn" type="submit">Создать аккаунт</button>
                    <a class="clear-link color-hint entry-signup-link" href="signin.hbs">Войти</a>
                </dir>
            </form>
        </div>`;
    }
}