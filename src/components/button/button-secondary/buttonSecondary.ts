import ButtonProps, { Button } from '../button';

import './buttonSecondary.css';

export class ButtonSecondary extends Button {
    static readonly NAME = 'ButtonSecondary';

    constructor({ ...props}: ButtonProps) {
        super({ 
            ...props,
            class: 'clear-btn button button__button-secondary', 
            events: { click: props.onClick } 
        });
    }
}
