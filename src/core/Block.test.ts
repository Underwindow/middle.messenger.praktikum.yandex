import { getByTestId } from '@testing-library/dom';
import { renderBlock, step } from 'tests/renderUtils';
import Block from './Block';

describe('core/Block', () => {
    const mock = jest.fn(() => {
        console.log('mockFunc called!');
    });

    class ClickableBlock<T extends Props> extends Block<T>
    {
        constructor(props: T) {
            super({
                ...props,
                events: {
                    click: () => mock(),
                }
            });
        }

        getProps(): T {
            return this.props;
        }
        
        protected render(): string {
            return `
                <div data-testid="test-block">Sample Text, {{test}}</div>
            `;
        }
    };

    it('should set events', async () => {
        await step('render testBlock to dom', () => {
            renderBlock({
                Block: ClickableBlock,
            });
        });

        await step('emit click', () => {
            const testBlock = getByTestId(document.body, 'test-block');
            testBlock.click();
        });

        expect(mock).toHaveBeenCalled();
    });

    it('should get element', async () => {
        const testBlock = await renderBlock({
            Block: ClickableBlock,
        }) as ClickableBlock<Props>;

        const testBlockHTML = getByTestId(document.body, 'test-block');

        expect(testBlockHTML).toEqual(testBlock.element);
    });

    it('should getContent', async () => {
        const testBlock = await renderBlock({
            Block: ClickableBlock,
        }) as ClickableBlock<Props>;

        const testBlockHTML = getByTestId(document.body, 'test-block');

        expect(testBlockHTML).toEqual(testBlock.getContent());
    });

    it('should set new props', async () => {
        const testBlock = await renderBlock({
            Block: ClickableBlock,
        }) as ClickableBlock<Props>;

        const nextProp = {
            test: 'test',
        };

        testBlock.setProps(nextProp);

        expect(testBlock.getProps().test).toBeDefined();
        expect(testBlock.getProps().events.click).toBeDefined();
    });

    it('should update html content', async () => {
        const testBlock = await renderBlock({
            Block: ClickableBlock,
        }) as ClickableBlock<Props>;

        const oldContent = testBlock.element?.textContent;

        testBlock.setProps({
            test: 'Hello world!',
        });

        expect(testBlock.element?.textContent !== oldContent).toEqual(true);
        expect(testBlock.element?.textContent).toEqual(`Sample Text, Hello world!`);
    });
});
