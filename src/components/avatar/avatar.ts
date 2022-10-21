import './avatar.css';
import Block from 'core/Block';

export interface AvatarProps {
    src?: string
    stubSrc?: string
    alt?: string
}

export default class Avatar extends Block<AvatarProps> {
    static readonly componentName: string = 'Avatar';

    constructor(props: AvatarProps) {
        super({ ...props });
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="user-avatar">
            <img 
                class="avatar-photo" 
                src="{{#if src}}{{src}}{{else}}{{stubSrc}}{{/if}}" 
                width="100%" height="100%" 
                alt="{{alt}}">
        </div>
        `;
    }
}
