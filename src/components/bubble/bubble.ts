import './bubble.css';
import { Block } from 'core';

export interface BubbleProps extends Props {
    id: number,
    userId: number,
    isIn: boolean,
    message: string,
    time: string,
    date: Date,
    name?: string,
}

export default class Bubble extends Block<BubbleProps> {
    static readonly componentName: string = 'Bubble';

    constructor({ name = '', ...props }: BubbleProps) {
        super({ ...props, name });
    }

    getProps(): BubbleProps {
        return { ...this.props };
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="bubble {{#if isIn}}bubble__bubble-in{{else}}bubble__bubble-out{{/if}}">
                <div class="bubble__wrapper">
                    <div class="bubble__content">
                        <div class="bubble__message">
                            {{message}}
                            <span class="bubble__details"><span>{{time}}</span>
                                <div class="bubble__time">{{time}}</div>
                            </span>
                        </div>
                        {{#if isIn}}
                        <div class="bubble__name">
                            <span class="color-hint">{{name}}</spa>
                        </div>
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}
