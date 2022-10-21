import './buttonSecondary.css';
import ButtonProps, { Button } from '../button';

export default class ButtonSecondary extends Button {
    static readonly componentName = 'ButtonSecondary';

    constructor({ ...props }: ButtonProps) {
        super({
            ...props,
            class: 'clear-btn button button__button-secondary',
            events: { click: props.onClick },
        });
    }
}
