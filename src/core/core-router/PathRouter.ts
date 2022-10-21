import { CoreRouter } from 'core';

export class PathRouter implements CoreRouter {
    private routes: Record<string, Function> = {};

    private isStarted = false;

    start() {
        if (!this.isStarted) {
            this.isStarted = true;

            window.onpopstate = (event: PopStateEvent) => {
                this._onRouteChange.call(this);
            };

            this._onRouteChange();
        }
    }

    private _onRouteChange(pathname: string = window.location.pathname) {
        const found = Object.entries(this.routes).some(([routePath, callback]) => {
            if (routePath === pathname) {
                callback();
                return true;
            }
            return false;
        });

        if (!found && this.routes['*']) {
            this.routes['*']();
        }
    }

    private _fixPath = (pathname: string, prefix: string = '/'): string => {
        if (!pathname) {
            return prefix;
        }
        else {
            return pathname[0] !== prefix ? prefix + pathname : pathname;
        }
    };

    use(path: string, callback: Function) {
        path = this._fixPath(path);

        this.routes[path] = callback;
        
        return this;
    }

    go(path: string) {
        path = this._fixPath(path);

        window.history.pushState({}, '', path);
        this._onRouteChange(path);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
