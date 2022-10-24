import {
    LoginRequestData, SignUpRequestData, transformUser, UserDTO,
    apiHasError, auth,
} from 'api';

import type { Dispatch } from 'core';
import { Screens } from 'utils';

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });

    await auth.logout();

    dispatch({ isLoading: false, user: null });

    window.router.go(Screens.SignIn);
};

export const signUp = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignUpRequestData,
) => {
    dispatch({ isLoading: true });

    const response = await auth.signUp(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = await auth.user();

    dispatch({ isLoading: false, loginFormError: null });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    window.router.go(Screens.Messenger);
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginRequestData,
) => {
    dispatch({ isLoading: true });

    const response = await auth.signIn(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = await auth.user();

    dispatch({ isLoading: false, loginFormError: null });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    window.router.go(Screens.Messenger);
};
