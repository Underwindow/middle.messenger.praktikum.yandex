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
import { ImageUpload } from 'components/image-upload';
import { Input } from 'components/input';
import { InputField } from 'components/input/input-field';
import { InputError } from 'components/input/input-error';
import { defaultState } from 'store';
import { initApp } from 'services';
import { SplashScreen } from 'pages/splash';
import { Logo } from 'components/logo';
import { NewChatForm } from 'components/new-chat';
import { ChatActions } from 'components/chat-actions';
import { ChatActionForm } from 'components/chat-action-form';
import { UserListItem } from 'components/user-list-item';
import { UserList } from 'components/user-list';
import initRouter from './router';

registerComponent(Header);
registerComponent(Avatar);
registerComponent(SidebarChats);
registerComponent(NewChatForm);
registerComponent(ChatDialog);
registerComponent(ErrorComponent);
registerComponent(Chat);
registerComponent(ChatActions);
registerComponent(ChatActionForm);
registerComponent(UserList);
registerComponent(UserListItem);
registerComponent(ChatStub);
registerComponent(ChatBubbles);
registerComponent(BubbleGroup);
registerComponent(Bubble);
registerComponent(ButtonPrimary);
registerComponent(ButtonSecondary);
registerComponent(ButtonIcon);
registerComponent(ImageUpload);
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

    initRouter(router, store);

    store.dispatch(initApp);
});
