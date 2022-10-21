import OnboardingPage from 'pages/onboarding';
import { SignInPage } from 'pages/login';
import { SignUpPage } from 'pages/login';
import { Messenger } from 'pages/messenger';
import { BlockClass } from 'core';
import { Profile } from 'pages/profile';


export enum Screens {
    Onboarding = 'onboadring',
    SignIn = 'sign-in',
    SignUp = 'sign-up',
    Messenger = 'messenger',
    Profile = "profile"
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.Onboarding]: OnboardingPage,
    [Screens.SignIn]: SignInPage,
    [Screens.SignUp]: SignUpPage,
    [Screens.Messenger]: Messenger,
    [Screens.Profile]: Profile,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
