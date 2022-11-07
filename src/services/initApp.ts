import {
    apiHasError, auth, transformUser, UserDTO,
} from 'api';
import type { Dispatch } from 'core';

export default async function initApp(dispatch: Dispatch<AppState>) {
    // await new Promise((r) => setTimeout(r, 500));

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
