import Block from 'core/Block';
import Messenger from 'pages/messenger';
import { renderDOM } from 'core';

import './entry.css';

export class LoginPage extends Block {
    constructor() {
        super({
            onClick: () => renderDOM(new Messenger()) 
        });
    }

    render() {
        // language=hbs
        return `
        <div class="whole content-center">
            <form class="entry-container " action="">
                <div class="entry-header content-center">Вход</div>
                <div class="entry-input-list content-center">
                    <div class="entry-input-item">
                        {{{Input 
                            ref="login"
                            name="login"
                            type="text"
                            placeholder="Логин"
                        }}}
                    </div>
                    <div class="entry-input-item">
                        {{{Input 
                            ref="password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                        }}}
                    </div>
                </div>
                <dir class="entry-footer content-center">
                    <button class="clear-btn entry-submit-btn" type="submit">
                        <a class="clear-link white" href="../server-error/server-error.hbs">Войти</a>
                    </button>
                    <a class="clear-link color-hint entry-signup-link" href="signup.hbs">Нет аккаунта?</a>
                </dir>
            </form>
        </div>
    `;
    }
}