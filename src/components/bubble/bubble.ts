import './bubble.css';
import Block from 'core/Block';
import { getUser } from 'services';

export interface BubbleProps extends Props {
    userId?: number,
    isIn?: boolean,
    message?: string,
    time?: string,
    name?: string,
}

export default class Bubble extends Block<BubbleProps> {
    static readonly componentName: string = 'Bubble';

    constructor(props: BubbleProps) {
        super(props);

        // const userId =this.props.userId; 
        // if (userId) {
        //     getUser(userId).then((user) => {
        //         if (user) {
        //             this.setProps({
        //                 name: user.displayName ? user.displayName : user.login
        //             })    
        //         }
        //     })
        // }
    }

    // protected getStateFromProps(props?: BubbleProps | undefined): void {
    //     const nextState = props;

    //     if (this.state?.name) {
    //         console.log('has Name');
    //         return;
    //     }

    //     if (nextState?.userId) {
    //         console.log('HERE');
            
    //         getUser(nextState.userId).then((user) => {
    //             if (user) {
    //                 nextState.name = user.displayName ? user.displayName : user.login;
    //             }

    //             console.log('nextState.name', nextState.name);

    //             this.setState(nextState);
    //         })
    //     }
    // }

    protected render(): string {
        // const state = this.state;

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
