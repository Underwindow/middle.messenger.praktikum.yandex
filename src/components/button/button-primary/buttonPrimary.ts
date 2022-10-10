import './buttonPrimary.css';
import ButtonProps, { Button } from '../button';

export default class ButtonPrimary extends Button {
    static readonly NAME = 'ButtonPrimary';

    constructor({ ...props }: ButtonProps) {
        super({
            ...props,
            class: 'clear-btn button__button-primary',
            events: { click: props.onClick },
        });
    }
}
