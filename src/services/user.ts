import {
    apiHasError, ChangePasswordRequestData, ChangeProfileRequestData, transformUser, user, UserDTO,
} from 'api';
import auth from 'api/auth';
import type { Dispatch } from 'core';
import { logout } from 'services';

export const changeProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangeProfileRequestData,
) => {
    console.log(state);

    const responseUser = await user.changeProfile(action);

    if (apiHasError(responseUser)) {
        console.log('---ERROR changeProfile', responseUser.reason);
        alert('Ошибка');

        return;
    }

    alert('Данные сохранены');

    dispatch({ user: transformUser(responseUser as UserDTO) });
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: FormData,
) => {
    console.log(state);

    const responseUser = await user.changeAvatar(action);

    if (apiHasError(responseUser)) {
        console.log('---ERROR changeAvatar', responseUser.reason);
        alert('Ошибка');

        return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });
};

export const changePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangePasswordRequestData,
) => {
    console.log(state);

    const response = await user.changePassword(action);

    if (apiHasError(response)) {
        console.log('---ERROR changePassword', response.reason);
        alert(response.reason);

        return;
    }

    alert('Пароль изменен');

    const responseUser = await auth.user();
    dispatch({ user: transformUser(responseUser as UserDTO) });

    if (apiHasError(responseUser)) {
        dispatch(logout);
    }
};

export const getUser = async (
    id: number,
) => {
    const responseUser = await user.getUser({ id });

    if (apiHasError(responseUser)) {
        console.log('---ERROR getUser', responseUser.reason);
        return null;
    }

    return transformUser(responseUser as UserDTO);
};

export const searchUsers = async (
    action: { login: string },
): Promise<User[] | null> => {
    const responseUsers = await user.search(action);

    if (apiHasError(responseUsers)) {
        console.log('---ERROR getUser', responseUsers.reason);
        return null;
    }

    const users = (responseUsers as UserDTO[])
        .map((userDTO) => transformUser(userDTO));

    return users;
};
