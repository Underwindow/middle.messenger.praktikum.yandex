import 'styles/app.css';
import { Messenger } from 'pages/messenger';
import { renderDOM, registerComponent } from './core';
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

require('babel-core/register');

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

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new Messenger());
});
