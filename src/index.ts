require("babel-core/register");
import { Block, renderDOM, registerComponent } from './core';

import 'styles/app.css';
import Messenger from 'pages/messenger';
import Avatar from 'components/avatar';
import ErrorComponent from 'components/error';
import Bubble from 'components/bubble';
import BubbleGroup from 'components/bubble/bubbleGroup';
import Header from 'components/header';
import Input from 'components/input';
import InputField from 'components/input/inputField';
import Chat from 'components/chat';
import ChatProps from 'components/chat/chat';
import AppError from 'components/AppError/AppError';
import { ErrorPage } from 'pages/error/error';
import { LoginPage } from 'pages/entry/login';
import { SignUpPage } from 'pages/entry';
import InputError from 'components/input/inputError';
registerComponent(Header);
registerComponent(Avatar);
registerComponent(ErrorComponent);
registerComponent(Bubble);
registerComponent(BubbleGroup);
registerComponent(Input);
registerComponent(InputField);
registerComponent(Chat);
registerComponent(InputError);

document.addEventListener("DOMContentLoaded", () => {
    
    // let appError: AppError = new AppError({
    //     code: '500',
    //     link: 'pohiu',
    //     description: 'sds'
    // });
    renderDOM(new SignUpPage());
});