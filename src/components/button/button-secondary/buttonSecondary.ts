import './buttonSecondary.css';
import Button, { ButtonProps } from '../button';

export default class ButtonSecondary extends Button {
    static readonly componentName = 'ButtonSecondary';

    constructor(props: ButtonProps) {
        super({
            ...props,
            class: 'clear-btn button button__button-secondary',
            events: {
                click: props.onClick,
            },
        });
    }
}
