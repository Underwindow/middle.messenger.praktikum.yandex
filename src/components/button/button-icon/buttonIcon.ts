import './buttonIcon.css';
import ButtonProps, { Button } from '../button';

export interface ButtonIconProps extends ButtonProps {
    icon: Icons,
    color?: Colors
}

type Icons = Values<typeof ButtonIcon.ICONS>;
type Colors = Values<typeof ButtonIcon.COLORS>;

export default class ButtonIcon extends Button {
    public static readonly NAME = 'ButtonIcon';

    public static readonly ICONS = {
        LOGOUT: 'logout',
        MORE_VERT: 'more_vert',
        ADD: 'add',
        BACK: 'arrow_back_ios_new',
        SEND: 'send',
    } as const;

    public static readonly COLORS = {
        WHITE: getComputedStyle(document.documentElement).getPropertyValue('--white'),
        HINT: getComputedStyle(document.documentElement).getPropertyValue('--hint'),
        ERROR: getComputedStyle(document.documentElement).getPropertyValue('--error'),
        GREEN: getComputedStyle(document.documentElement).getPropertyValue('--green'),
    } as const;

    constructor({
        icon, color = ButtonIcon.COLORS.HINT, type, ...props
    }: ButtonIconProps) {
        super({
            ...props,
            type: 'button',
            color,
            text: icon,
            class: 'material-icons button__button-icon',
            events: { click: props.onClick },
        });

        if (this.element) this.element.style.color = color;
    }
}
