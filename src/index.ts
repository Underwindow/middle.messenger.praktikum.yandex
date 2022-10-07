require("babel-core/register");
import { Block, renderDOM, registerComponent } from './core';

import 'styles/app.css';
import Messenger from 'pages/messenger';
import Avatar from 'components/avatar';
import ErrorComponent from 'components/app-error';
import Bubble from 'components/bubble';
import BubbleGroup from 'components/bubble/bubble-group';
import Header from 'components/header';
import Input from 'components/input';
import InputField from 'components/input/input-field';
import ChatDialog from 'components/sidebar-chats/chat-dialog';
import { ErrorPage } from 'pages/error-page/error';
import { SignInPage, SignUpPage } from 'pages/entry';
import InputError from 'components/input/input-error';
import Chat from 'components/chat';
import SidebarChats from 'components/sidebar-chats';
import ButtonPrimary from 'components/button/button-primary';
import ButtonSecondary from 'components/button/button-secondary';
import ButtonIcon from 'components/button/button-icon';
import Profile from 'pages/profile';
import ChatBubbles from 'components/chat-bubbles';
import ChatStub from 'components/chat-stub';

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

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new Messenger);
});