import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from 'utils';

type Route = {
    path: string,
    block: Screens,
    shouldAuthorized: boolean,
    shouldGuest?: boolean,
};

const routes: Route[] = [
    {
        path: '/',
        block: Screens.SignIn,
        shouldAuthorized: false,
    },
    {
        path: `/${Screens.SignUp}`,
        block: Screens.SignUp,
        shouldAuthorized: false,
    },
    {
        path: `/${Screens.Messenger}`,
        block: Screens.Messenger,
        shouldAuthorized: true,
    },
    {
        path: `/${Screens.Profile}`,
        block: Screens.Profile,
        shouldAuthorized: true,
    },
    {
        path: '*',
        block: Screens.Error,
        shouldAuthorized: false,
        shouldGuest: true,
    },
];

export default function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach((route) => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);
            let screen;

            if (route.shouldGuest) {
                screen = route.block;
            } else if (
                (isAuthorized && route.shouldAuthorized)
                || (!isAuthorized && !route.shouldAuthorized)) {
                screen = route.block;
            } else if (isAuthorized && !route.shouldAuthorized) {
                screen = Screens.Messenger;
            } else if (!isAuthorized && route.shouldAuthorized) {
                screen = Screens.SignIn;
            } else if (!currentScreen) {
                screen = Screens.SignIn;
            }

            if (screen !== store.getState().screen) {
                store.dispatch({ screen });
            } else {
                router.redirect(store.getState().screen);
            }
        });
    });

    /**
     * Глобальный слушатель изменений в сторе
     * для переключения активного экрана
     */
    store.on('changed', (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start();
        }

        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page({}));
            document.title = `App / ${Page.componentName}`;

            router.redirect(nextState.screen);
        }
    });
}
