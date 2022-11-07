import './logo.css';
import { Block } from 'core';

interface LogoProps extends Props {
    black?: boolean,
    onClick?: string,
}

export default class Logo extends Block<LogoProps> {
    static readonly componentName = 'Logo';

    constructor(props: LogoProps) {
        super({ ...props, events: { click: props.onClick } });
    }

    render() {
        // language=hbs
        return `
        <div class="logo{{#if black}} logo__logo-black{{/if}}">
            <div class="logo__top"></div>
            <div class="logo__left"></div>
            <div class="logo__right"></div>
        </div>
    `;
    }
}
