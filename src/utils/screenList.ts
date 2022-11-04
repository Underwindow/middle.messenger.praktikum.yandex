import { BlockClass } from 'core';
import { SignInPage as SignInBlock, SignUpPage as SignUpBlock } from 'pages/login';
import { Messenger as MesssengerBlock } from 'pages/messenger';
import { Profile as ProfileBlock } from 'pages/profile';
import { ErrorPage as ErrorBlock } from 'pages/error-page';

export enum Screens {
    SignIn = '',
    SignUp = 'sign-up',
    Messenger = 'messenger',
    Profile = 'settings',
    Error = 'error',
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.SignIn]: SignInBlock,
    [Screens.SignUp]: SignUpBlock,
    [Screens.Messenger]: MesssengerBlock,
    [Screens.Profile]: ProfileBlock,
    [Screens.Error]: ErrorBlock,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => map[screen];
