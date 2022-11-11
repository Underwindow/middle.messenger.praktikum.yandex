import {
    BlockClass, renderDOM, registerComponent, Store,
} from 'core';
import { defaultState } from 'store';
import { sleep } from 'utils';
import * as components from 'components';
import MockedPathRouter from 'tests/MockedPathRouter';
import initRouter from '../router';

type RenderBlockParams<T extends Props> = {
    Block: BlockClass<T>;
    props?: T;
    state?: Partial<AppState>;
};

// eslint-disable-next-line
export async function renderBlock<T extends Props>({ Block, props = undefined, state = defaultState }: RenderBlockParams<T>) {
    Object.values(components).forEach((Component: any) => {
        registerComponent(Component);
    });

    const store = new Store<AppState>({ ...defaultState, ...state });
    const router = new MockedPathRouter();

    window.router = router;
    window.store = store;

    document.body.innerHTML = '<div id="app"></div>';

    const block = new Block(props as T);
    renderDOM(block);

    initRouter(router, store);

    /**
     * Ждем вызова componentDidMount,
     * медота жизненного цикла компонента,
     * который вызывается через 100мс в Block.getContent
     */
    await sleep();

    return block;
}

export async function step(name: string, callback: () => void) {
    console.log(name);
    await callback();
}
