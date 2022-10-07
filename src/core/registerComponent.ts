import Block from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<P extends Props = {}, IncomingProps = Props> {
    new(props: IncomingProps): Block<P>;
    readonly NAME: string;
}

export default function registerComponent<P extends Props = {}, IncomingProps extends Props = {}>(Component: BlockConstructable<P, IncomingProps>) {
    Handlebars.registerHelper(Component.NAME, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
        if (!data.root.children) {
            data.root.children = {};
        }

        if (!data.root.refs) {
            data.root.refs = {};
        }

        const { children, refs } = data.root;
        
        (Object.keys(hash) as any).forEach((key: keyof Props) => {
            if (this[key] && typeof this[key] === 'string') {
                hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
            }
        });

        const component = new Component(hash);

        children[component.id] = component;


        if (ref) {
            if (refs[ref]) {
                const oldRefs: Block[] = [...(Array.isArray(refs[ref])
                    ? refs[ref]
                    : [refs[ref]]) as Block[]];

                refs[ref] = [...oldRefs, component];
            }
            else {
                refs[ref] = component;
            }
        }

        const contents = fn ? fn(this) : '';

        return `<div data-id="${component.id}">${contents}</div>`;
    })
}