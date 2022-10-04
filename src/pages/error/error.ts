import Block from 'core/Block';
import Messenger from 'pages/messenger';
import { renderDOM } from 'core';

import './error.css';

export class ErrorPage extends Block {
    constructor() {
        super({
            onClick: () => renderDOM(new Messenger()) 
        });
    }

    render() {
        // language=hbs
        return `
    <div class="screen content-center back-panel">
        {{{Error onClick=onClick code="404" description="Не туда попали" link="" text="Вернуться на главную"}}}
    </div>
    `;
    }
}