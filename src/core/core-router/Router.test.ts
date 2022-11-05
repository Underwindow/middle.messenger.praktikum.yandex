import { MockedPathRouter } from 'tests/MockedPathRouter';

describe('core/core-router/PathRouter', () => {
    const url = "/dummy.com";

    it('should change path', () => {
        global.window = Object.create(global.window);
        Object.defineProperty(window, 'location', {
            value: {
                pathname: url
            }
        });
        expect(window.location.pathname).toEqual(url);

        const router = new MockedPathRouter();
        router.go('/dummy.ru');

        expect(window.location.pathname).toEqual('/dummy.ru');
    });

    it('should set callback path', () => {
        const router = new MockedPathRouter();
        const callback = () => {
            console.log('callback invoked!');
        }
        
        router.use(url, callback);
        expect(router.getRoutes()[url]).toEqual(callback);
    });

    it('should call callback when go to url', () => {
        const router = new MockedPathRouter();

        const mockCallback = jest.fn();
        
        router.use(url, mockCallback);
        router.go(url);
        expect(mockCallback).toHaveBeenCalled();
    });
});
