import { CoreRouter } from 'core';

export default class PathRouter implements CoreRouter {
    private routes: Record<string, Function> = {};
    private isStarted = false;

    start() {
        if (!this.isStarted) {
            this.isStarted = true;

            window.onpopstate = () => {
                this._onRouteChange.call(this);
            };

            this._onRouteChange();
        }
    }

    private _onRouteChange(pathname: string = window.location.pathname) {
        console.log(pathname);
        
        const found = Object.entries(this.routes).some(([routePath, callback]) => {
            if (routePath === pathname) {
                callback();
                return true;
            }

            return false;
        });

        if (!found) {
            if (this.routes['/*']) {
                this.routes['/*']();
            }
        }
    }

    private _fixPath(pathname: string, prefix: string = '/'): string {
        if (!pathname) {
            return prefix;
        }

        return pathname[0] !== prefix ? prefix + pathname : pathname;
    }

    use(path: string, callback: Function) {
        const fixedPath = this._fixPath(path);

        this.routes[fixedPath] = callback;

        return this;
    }

    go(path: string) {
        const fixedPath = this._fixPath(path);

        window.history.pushState({}, '', fixedPath);
        this._onRouteChange(fixedPath);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
