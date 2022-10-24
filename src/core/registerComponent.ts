import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

interface BlockConstructable<P extends Props = {}, IncomingProps = Props> {
    new(props: IncomingProps): Block<P>;
    componentName: string;
}

/* eslint-disable-next-line */
export default function registerComponent<P extends Props = {}, IncomingProps extends Props = {}>(Component: BlockConstructable<P, IncomingProps>) {
    Handlebars.registerHelper(
        Component.componentName,
        function parseComponents(this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
            const root = { ...data.root };

            if (!root.children) {
                root.children = {};
            }

            if (!root.refs) {
                root.refs = {};
            }

            const { children, refs }: {
                children: { [id: string]: Block<P> },
                refs: { [key: string]: Block<P> | Block<P>[] }
            } = root;

            const hashTemp = { ...hash };

            (Object.keys(hashTemp) as any).forEach((key: keyof Props) => {
                if (this[key] && typeof this[key] === 'string') {
                    hashTemp[key] = hashTemp[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
                }
            });

            const component = new Component(hashTemp);

            children[component.id] = component;

            if (ref) {
                if (refs[ref]) {
                    const oldRefs = (
                        Array.isArray(refs[ref])
                            ? refs[ref]
                            : [refs[ref]]
                    ) as Block<P>[];

                    refs[ref] = [...oldRefs, component];
                } else {
                    refs[ref] = component;
                }
            }

            const contents = fn ? fn(this) : '';

            return `<div data-id="${component.id}">${contents}</div>`;
        },
    );
}
