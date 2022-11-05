import './imageUpload.css';
import { Block } from 'core';
import { resources } from 'utils/request';

export interface ImageUploadProps extends Props {
    name: string,
    src?: string, 
    alt?: string, 
    onInput?: Callback,
    onBlur?: Callback,
    onFocus?: Callback,
}

export default class ImageUpload extends Block<ImageUploadProps> {
    static readonly componentName: string = 'ImageUpload';

    private readonly _inputEl: HTMLInputElement;

    constructor(props: ImageUploadProps) {
        super({
            ...props,
            onKeydown: (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    console.log('Enter submit check');
                }
            },
        });

        this._inputEl = (this.refs.inputFieldRef as Block).element as HTMLInputElement;
    }

    get fileList(): FileList | null {
        return this._inputEl.files;
    }

    get name(): string {
        return this._inputEl.name;
    }

    protected render(): string {
        const src = this.props.src
            ? resources + this.props.src
            : 'https://www.w3schools.com/tags/img_girl.jpg';

        // language=hbs
        return `
        <div class="image-upload">
            <label class="image-upload__label" for="${this.id}">
                <img class="image-upload__image" src="${src}" alt={{alt}}/>
                <div class="image-upload__icon-wrapper content-center">
                    <div class="image-upload__icon material-icons color-hint">
                        upload
                    </div>
                </div>
            </label>
            {{{InputField 
                id="${this.id}"
                ref="inputFieldRef"
                name=name 
                type="file"
                accept="image/*"
                display="none"
                onInput=onInput
                onBlur=onBlur
                onFocus=onFocus
                onKeydown=onKeydown
            }}}
        </div>
        `;
    }
}
