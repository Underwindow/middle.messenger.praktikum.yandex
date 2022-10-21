import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from 'utils';

const routes = [
    {
        path: `/`,
        block: Screens.Messenger,
        shouldAuthorized: true,
    },
    {
        path: `/${Screens.SignIn}`,
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
        path: `*`,
        block: Screens.Messenger,
        shouldAuthorized: true,
    },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (!currentScreen) {
                store.dispatch({ screen: Screens.SignIn });
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
        }
    });
}

// const routes = [
//     {
//         path: '/sign-in',
//         block: Pages.SignIn,
//         shouldAuthorized: false,
//     },
//     {
//         path: '/sign-up',
//         block: Pages.SignUp,
//         shouldAuthorized: false,
//     },
//     {
//         path: '/messenger',
//         block: Pages.Messenger,
//         shouldAuthorized: true,
//     },
//     {
//         path: '/profile',
//         block: Pages.Profile,
//         shouldAuthorized: true,
//     },
//     {
//         path: '*',
//         block: Pages.SignIn,
//         shouldAuthorized: false,
//     },
//     {
//         path: '/error',
//         block: Pages.Error,
//         shouldAuthorized: false,
//     },
// ];