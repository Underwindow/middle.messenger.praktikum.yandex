import { SignInPage } from 'pages/login';
import { SignUpPage } from 'pages/login';
import { Messenger } from 'pages/messenger';
import { BlockClass } from 'core';
import { Profile } from 'pages/profile';


export enum Screens {
    SignIn = '',
    SignUp = 'sign-up',
    Messenger = 'messenger',
    Profile = "settings"
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.SignIn]: SignInPage,
    [Screens.SignUp]: SignUpPage,
    [Screens.Messenger]: Messenger,
    [Screens.Profile]: Profile,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
