import './header.css';
import { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import Block from 'core/Block';

export interface HeaderProps extends Props {
    leftBtnProps?: ButtonIconProps
    rightBtnProps?: ButtonIconProps
    title?: string
    avatarSrc?: string
    onClick?: () => void
}

export default class Header extends Block<HeaderProps> {
    static readonly componentName: string = 'Header';

    readonly titleClicked = new CustomEvent('titleClicked', {
        bubbles: false,
    });

    constructor({ ...props }: HeaderProps) {
        super({
            ...props,
            events: {
                titleClicked: props.onClick,
            },
        });

        this.subscribeOnTitle();
    }

    subscribeOnTitle() {
        const titleBtn = this.element?.querySelector('.header__title-container') as HTMLButtonElement;

        if (!titleBtn)
            return;
            
        if (!this.props.onClick) {
            titleBtn.disabled = true;
        } else {
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
        `;
    }
}
