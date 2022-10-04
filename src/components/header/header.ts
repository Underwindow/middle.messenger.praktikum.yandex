import AvatarProps from 'components/avatar/avatar';
import Block from 'core/Block';

import './header.css';

export default interface HeaderProps {
    leftButton?: string
    leftLink?: string
    rightButton?: string
    rightLink?: string
    title?: string
    titleLink?: string
    avatarSrc?: string
}

export class Header extends Block {
    static NAME: string = 'Header';

    constructor({ ...props }: HeaderProps) {
        super({ ...props });
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="header panel">
            {{#if leftButton}}
            <button class="material-icons icon-btn">{{leftButton}}</button>
            {{/if}}
            {{#if title}}
            <div class="header__title-wrapper">
                {{#if titleLink}}
                <a class="whole clear-link header__title-container" href="{{titleLink}}">
                    {{{Avatar src=avatarSrc }}}
                    <h1 class="header__title">
                        {{title}}
                    </h1>
                </a>
                {{else}}
                <div class="whole header__title-container">
                    {{#if avatarSrc}}
                    {{{Avatar src=avatarSrc }}}
                    {{/if}}
                    <h1 class="header__title">
                        {{title}}
                    </h1>
                </div>
                {{/if}}
            </div>
            {{/if}}
            {{#if rightButton}}
            <button class="material-icons icon-btn">{{rightButton}}</button>
            {{/if}}
        </div>
        `
    }
}