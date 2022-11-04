import './avatar.css';
import { Block } from 'core';
import { resources } from 'utils/request';

export interface AvatarProps extends Props {
    src?: string,
    alt?: string,
}

export default class Avatar extends Block<AvatarProps> {
    static readonly componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super(props);
    }

    protected render(): string {
        const src = this.props.src
            ? resources + this.props.src
            : 'https://www.w3schools.com/tags/img_girl.jpg';

        // language=hbs
        return `
        <div class="user-avatar">
            <img 
                class="avatar-photo" 
                src="${src}" 
                width="100%" height="100%" 
                alt="{{alt}}">
        </div>
        `;
    }
}
