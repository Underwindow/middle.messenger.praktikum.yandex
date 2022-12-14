import './buttonPrimary.css';
import Button, { ButtonProps } from '../button';

export default class ButtonPrimary extends Button {
    static readonly componentName = 'ButtonPrimary';

    constructor(props: ButtonProps) {
        super({
            ...props,
            class: 'clear-btn button__button-primary',
            events: {
                click: props.onClick,
            },
        });
    }
}
