import Block from 'core/Block';

import './bubble.css';

export default interface BubbleProps extends Props {
    isIn?: boolean
    message?: string
    time?: string
    name?: string
}

export class Bubble extends Block<BubbleProps> {
    static readonly NAME: string = 'Bubble';

    constructor(props: BubbleProps) {
        super({ ...props });
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
        `
    }
}