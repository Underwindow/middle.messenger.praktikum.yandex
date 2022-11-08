import { CoreRouter } from 'core';

export default class PathRouter implements CoreRouter {
    protected routes: Record<string, Function> = {};

    protected isStarted = false;

    protected route: Nullable<string> = null;

    start() {
        if (!this.isStarted) {
            this.isStarted = true;

            window.onpopstate = () => {
                this.onRouteChange.call(this);
            };

            this.onRouteChange();
        }
    }

    onRouteChange(pathname: string = window.location.pathname) {
        console.log(this.route, 'to', pathname);
        if (pathname === this.route) return;

        const found = Object.entries(this.routes).some(([routePath, callback]) => {
            if (routePath === pathname) {
                this.route = routePath;
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

    redirect(path: string): void {
        const fixedPath = this._fixPath(path);

        if (this.route !== fixedPath) {
            console.log('redirect');
            window.history.pushState({}, '', fixedPath);
            this.route = fixedPath;
        }
    }

    setPath(path: string) {
        const fixedPath = this._fixPath(path);

        console.log('pushstate', fixedPath);
        window.history.pushState({}, '', fixedPath);
        this.route = fixedPath;
    }

    go(path: string) {
        const fixedPath = this._fixPath(path);

        if (this.route !== fixedPath) {
            console.log('pushstate', fixedPath);
            window.history.pushState({}, '', fixedPath);
            this.onRouteChange(fixedPath);
        }
    }

    back() {
        window.history.back();

        this.onRouteChange();
    }

    forward() {
        window.history.forward();

        this.onRouteChange();
    }
}
