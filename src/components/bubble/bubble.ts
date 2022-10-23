import './bubble.css';
import Block from 'core/Block';
import { getUser } from 'services';

export interface BubbleProps extends Props {
    userId: number,
    isIn: boolean,
    message: string,
    time: string,
    name?: string,
}

export default class Bubble extends Block<BubbleProps> {
    static readonly componentName: string = 'Bubble';

    constructor(props: BubbleProps) {
        super(props);

        if (!props.name) {
            getUser(props.userId).then((user) => {
                if (user) {
                    this.setProps({
                        name: user.displayName ? user.displayName : user.login
                    })
                }
            });
        }
    }

    get userId(): number {
        return this.props.userId;
    }

    get name(): string | undefined {
        return this.props.name;
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
