require('babel-core/register');

import 'styles/app.css';
import { renderDOM, registerComponent, PathRouter, Store, CoreRouter } from './core';
import { Avatar } from 'components/avatar';
import { Header } from 'components/header';
import { SidebarChats } from 'components/sidebar-chats';
import { ChatDialog } from 'components/sidebar-chats/chat-dialog';
import { Error as ErrorComponent } from 'components/app-error';
import { Chat } from 'components/chat';
import { ChatStub } from 'components/chat-stub';
import { ChatBubbles } from 'components/chat-bubbles';
import { BubbleGroup } from 'components/bubble/bubble-group';
import { Bubble } from 'components/bubble';
import { ButtonPrimary } from 'components/button/button-primary';
import { ButtonSecondary } from 'components/button/button-secondary';
import { ButtonIcon } from 'components/button/button-icon';
import { Input } from 'components/input';
import { InputField } from 'components/input/input-field';
import { InputError } from 'components/input/input-error';
import { defaultState } from 'store';
import { initRouter } from './router';
import { initApp } from 'services';
import SplashScreen from 'pages/splash';
import Logo from 'components/logo';

registerComponent(Header);
registerComponent(Avatar);
registerComponent(SidebarChats);
registerComponent(ChatDialog);
registerComponent(ErrorComponent);
registerComponent(Chat);
registerComponent(ChatStub);
registerComponent(ChatBubbles);
registerComponent(BubbleGroup);
registerComponent(Bubble);
registerComponent(ButtonPrimary);
registerComponent(ButtonSecondary);
registerComponent(ButtonIcon);
registerComponent(Input);
registerComponent(InputField);
registerComponent(InputError);
registerComponent(Logo);

declare global {
    interface Window {
        store: Store<AppState>;
        router: CoreRouter;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new PathRouter();

    /**
    * Помещаем роутер и стор в глобальную область для доступа в хоках with*
    * @warning Не использовать такой способ на реальный проектах
    */
    window.router = router;
    window.store = store;

    renderDOM(new SplashScreen({}));

    store.on('changed', (prevState, nextState) => {
        if (process.env.DEBUG) {
            console.log(
                '%cstore updated',
                'background: #222; color: #bada55',
                nextState,
            );
        }
    });

    initRouter(router, store);

    store.dispatch(initApp);

    // renderDOM(new Messenger());
});
