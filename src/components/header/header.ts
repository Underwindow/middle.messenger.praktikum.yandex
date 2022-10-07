import AvatarProps from 'components/avatar/avatar';
import { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import Block from 'core/Block';

import './header.css';

// export default interface HeaderProps {
//     leftButton?: string
//     leftLink?: string
//     rightButton?: string
//     rightLink?: string
//     title?: string
//     titleLink?: string
//     avatarSrc?: string
// }

export default interface HeaderProps extends Props {
    leftBtnProps?: ButtonIconProps
    rightBtnProps?: ButtonIconProps
    title?: string
    avatarSrc?: string
    onClick?: () => void
}

export class Header extends Block<HeaderProps> {
    static readonly NAME: string = 'Header';
    
    public readonly titleClicked = new CustomEvent('titleClicked', {
        bubbles: false,
    });

    constructor({...props}: HeaderProps) {
        super({
            ...props,
            events: {
                titleClicked: props.onClick
            }
        });

        this.subscribeOnTitle();
    }

    subscribeOnTitle() {
        const titleBtn = this.element?.querySelector('.header__title-container') as HTMLButtonElement;

        if (!this.props.onClick) {
            titleBtn.disabled = true;
        }
        else {
            titleBtn.addEventListener('click', () => this.element?.dispatchEvent(this.titleClicked));
        }
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="header panel">
            {{#if leftBtnProps}}
                {{#with leftBtnProps}}
                    {{{ButtonIcon onClick=onClick icon=icon}}}
                {{/with}}
            {{/if}}
            {{#if title}}
            <div class="header__title-wrapper">
                <button type="button" class="whole clear-btn header__title-container">
                    {{#if avatarSrc}}
                        {{{Avatar src=avatarSrc }}}
                    {{/if}}
                    <h1 class="header__title">
                        {{title}}
                    </h1>
                </button>
            </div>
            {{/if}}
            {{#if rightBtnProps}}
                {{#with rightBtnProps}}
                    {{{ButtonIcon onClick=onClick icon=icon}}}
                {{/with}}
            {{/if}}
        </div>
        `
    }
    // protected render(): string {
    //     // language=hbs
    //     return `
    //     <div class="header panel">
    //         {{#if leftButton}}
    //         <button class="material-icons icon-btn">{{leftButton}}</button>
    //         {{/if}}
    //         {{#if title}}
    //         <div class="header__title-wrapper">
    //             {{#if titleLink}}
    //             <a class="whole clear-link header__title-container" href="{{titleLink}}">
    //                 {{{Avatar src=avatarSrc }}}
    //                 <h1 class="header__title">
    //                     {{title}}
    //                 </h1>
    //             </a>
    //             {{else}}
    //             <div class="whole header__title-container">
    //                 {{#if avatarSrc}}
    //                 {{{Avatar src=avatarSrc }}}
    //                 {{/if}}
    //                 <h1 class="header__title">
    //                     {{title}}
    //                 </h1>
    //             </div>
    //             {{/if}}
    //         </div>
    //         {{/if}}
    //         {{#if rightButton}}
    //         <button class="material-icons icon-btn">{{rightButton}}</button>
    //         {{/if}}
    //     </div>
    //     `
    // }
}