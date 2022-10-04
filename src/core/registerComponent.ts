import Block from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<Props extends {} = any> {
    new(props: Props): Block;
    readonly NAME: string;
}

export default function registerComponent<Props extends {} = any>(Component: BlockConstructable<Props>) {
    Handlebars.registerHelper(Component.NAME, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
        //console.log(Component.NAME);

        if (!data.root.children) {
            data.root.children = {};
        }

        if (!data.root.refs) {
            data.root.refs = {};
        }

        // const { children, refs } = data.root as {
        //     children: Record<string, Block>,
        //     refs: Record<string, Block | Block[]>
        // };
        const { children, refs } = data.root;

        (Object.keys(hash) as any).forEach((key: keyof Props) => {
            if (this[key] && typeof this[key] === 'string') {
                hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
            }
        });

        const component = new Component(hash);
        
        children[component.id] = component;


        if (ref) {
            // refs[ref] = component;
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
        // console.log(ref, refs[ref]);

        const contents = fn ? fn(this) : '';

        return `<div data-id="${component.id}">${contents}</div>`;
    })
}