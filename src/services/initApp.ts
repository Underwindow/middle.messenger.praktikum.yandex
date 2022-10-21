import { apiHasError, auth, transformUser, UserDTO } from 'api';
import type { Dispatch } from 'core';
import { Screens } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {

    // Ручкая задержка для демонстрации загрузочного экрана
    await new Promise(r => setTimeout(r, 700));

    try {
        const response = await auth.user();

        if (apiHasError(response)) {
            // window.router.go(Screens.SignIn);
            return;
        }

        dispatch({ user: transformUser(response as UserDTO) });
        // window.router.go(Screens.Messenger);
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });
    }
}
