import Block from 'core/Block';

import './avatar.css';

export default interface AvatarProps {
    src?: string
    stubSrc?: string
    alt?: string
}

export class Avatar extends Block {
    static NAME: string = 'Avatar';

    constructor({ ...props }: AvatarProps) {
        super({ ...props });
    }

    protected render(): string {
        // language=hbs
        return `
        <div class="user-avatar">
            <img 
                class="avatar-photo" 
                src="{{#if src}}{{src}}{{else}}{{stubSrc}}{{/if}}" 
                width="54" height="54" 
                alt="{{alt}}">
        </div>
        `
    }
}