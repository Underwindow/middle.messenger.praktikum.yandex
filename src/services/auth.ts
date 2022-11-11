import {
    LoginRequestData, SignUpRequestData, transformUser, UserDTO,
    apiHasError, auth, APIError,
} from 'api';

import { Dispatch } from 'core';
import { Screens } from 'utils';

export const logout = async (dispatch: Dispatch<AppState>, state: AppState) => {
    console.log(state);
    dispatch({ isLoading: true });

    await auth.logout();

    dispatch({ isLoading: false, user: null, screen: Screens.SignIn });
};

const onAuthError = (error: APIError): Partial<AppState> => {
    const state = error.status < 500
        ? { isLoading: false, loginFormError: error.reason, apiError: error }
        : { screen: Screens.Error, apiError: error };

    return state;
};

export const signUp = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignUpRequestData,
) => {
    console.log(state);
    dispatch({ isLoading: true });

    const response = await auth.signUp(action);

    if (apiHasError(response)) {
        dispatch(onAuthError(response));
        return;
    }

    const responseUser = await auth.user();
    const user = transformUser(responseUser as UserDTO);

    dispatch({
        isLoading: false, loginFormError: null, apiError: null, user,
    });

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
    console.log(state);
    dispatch({ isLoading: true });

    const response = await auth.signIn(action);

    if (apiHasError(response)) {
        dispatch(onAuthError(response));
        return;
    }

    const responseUser = await auth.user();
    const user = transformUser(responseUser as UserDTO);

    dispatch({
        isLoading: false, loginFormError: null, apiError: null, user,
    });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ screen: Screens.Messenger });
};
