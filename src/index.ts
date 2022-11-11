require('babel-core/register');

import 'styles/app.css';

import { CoreRouter, PathRouter, registerComponent, renderDOM, Store } from 'core';
import { defaultState } from 'store';
import { initApp } from 'services';
import initRouter from './router';
import { SplashScreen } from 'pages/splash';

import * as components from 'components';

Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
});


declare global {
    interface Window {
        store: Store<AppState>;
        router: CoreRouter;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new PathRouter();

    /**
    * Помещаем роутер и стор в глобальную область для доступа в хоках with*
    * @warning Не использовать такой способ на реальный проектах
    */
    window.router = router;
    window.store = store;
    
    initRouter(router, store);
    store.dispatch(initApp);
    
    renderDOM(new SplashScreen({}));
});
