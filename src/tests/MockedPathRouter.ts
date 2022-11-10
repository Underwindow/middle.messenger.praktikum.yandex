import { PathRouter } from 'core';

export default class MockedPathRouter extends PathRouter {
    private _window: any;

    constructor(window: any = global.window) {
        super();

        this._window = window;
    }

    go(pathname: string) {
        this._window.location.pathname = pathname;
        this.onRouteChange();
    }

    getRoutes() {
        return this.routes;
    }
}
