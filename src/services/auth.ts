import {
    LoginRequestData, SignUpRequestData, transformUser, UserDTO,
    apiHasError, auth,
} from 'api';

import { Dispatch } from 'core';
import { Screens } from 'utils';

export const logout = async (dispatch: Dispatch<AppState>, state: AppState,) => {
    dispatch({ isLoading: true });

    await auth.logout();

    dispatch({ isLoading: false, user: null });

    console.log(state)
    dispatch({ screen: Screens.SignIn });
};

export const signUp = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignUpRequestData,
) => {
    dispatch({ isLoading: true });

    const response = await auth.signUp(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason, apiError: response });
        return;
    }

    const responseUser = await auth.user();
    const user = transformUser(responseUser as UserDTO);

    dispatch({ isLoading: false, loginFormError: null, apiError: null, user: user });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ screen: Screens.Messenger });
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginRequestData,
) => {
    dispatch({ isLoading: true });

    const response = await auth.signIn(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason, apiError: response });
        return;
    }

    const responseUser = await auth.user();
    const user = transformUser(responseUser as UserDTO);

    dispatch({ isLoading: false, loginFormError: null, apiError: null, user: user });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ screen: Screens.Messenger });
};
