import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from 'utils';

type Route = {
    path: string,
    block: Screens,
    shouldAuthorized: boolean,
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
        block: Screens.Messenger,
        shouldAuthorized: true,
    },
];

export default function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach((route) => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            console.log('isAuthorized && !route.shouldAuthorized');

            if (isAuthorized && route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (!isAuthorized && !route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (isAuthorized && !route.shouldAuthorized) {
                router.go(Screens.Messenger);
                // store.dispatch({ screen: Screens.Messenger });
                return;
            }

            if (!isAuthorized && route.shouldAuthorized) {
                router.go(Screens.SignIn);
                // store.dispatch({ screen: Screens.SignIn });
                return;
            }

            if (!currentScreen) {
                router.go(Screens.SignIn);
                // store.dispatch({ screen: Screens.SignIn });
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
