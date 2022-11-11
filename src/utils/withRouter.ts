import { BlockClass, CoreRouter } from 'core';

interface WithRouterProps extends Props {
    router: CoreRouter
}

export default function withRouter<P extends Props = WithRouterProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified number of type arguments
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, router: window.router });
        }
    } as BlockClass<Omit<P, 'router'>>;
}
