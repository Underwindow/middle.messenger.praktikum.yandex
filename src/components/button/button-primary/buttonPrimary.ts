import ButtonProps, { Button } from '../button';

import './buttonPrimary.css';

export class ButtonPrimary extends Button {
    static readonly NAME = 'ButtonPrimary';

    constructor({ ...props}: ButtonProps) {
        super({ 
            ...props,
            class: 'clear-btn button__button-primary', 
            events: { click: props.onClick } 
        });
    }
}
