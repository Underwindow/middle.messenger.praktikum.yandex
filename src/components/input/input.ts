import Block from 'core/Block';
import { validateValue, ValidationType } from 'helpers/validateValue';

import './input.css';
import InputError from './input-error';
import { InputFieldProps } from './input-field/inputField';
import InputField from './input-field';

export interface InputProps extends InputFieldProps {
    icon?: string;
    validationType?: ValidationType;
}

export class Input extends Block<InputProps> {
    public static readonly NAME: string = 'Input';

    public static fieldsetValidate(fieldset: Input[]): boolean {
        let success: boolean = true;

        for (const input of fieldset) {
            const validationError = input.validate();
            if (validationError)
                success = false;
        }
    
        return success;
    }
    
    constructor({ validationType, ...props }: InputProps) {
        super({
            ...props,
            validationType,
            error: '',
            onInput: () => {
                this.validate();         
            },
            onKeydown: (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    console.log('Enter submit check');
                    
                    const validationError = this.validate();
                    
                    if (validationError) {
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    public get value() : string {
        const inputEl = (this.refs.inputFieldRef as InputField).element as HTMLInputElement;
        return inputEl.value;
    }
    
    public setErrorMessage(errorMessage?: string) {
        const errorRef = this.refs.errorRef as InputError;
        errorRef.setProps({ text: errorMessage });
    }

    public validate(): string {
        const validationType = this.props.validationType;

        if (!validationType)
            return '';

        const inputEl = (this.refs.inputFieldRef as InputField).element as HTMLInputElement;
        const errorMessage = validateValue(validationType, inputEl.value);
        const errorRef = this.refs.errorRef as InputError;

        if (errorMessage) {
            this.setErrorMessage(errorMessage);
        }
        else {
            console.log(validationType, 'success');
            this.setErrorMessage();
        }

        return errorMessage;
    }

    protected render(): string {
        console.log('render', this.constructor.name, this.id);

        // language=hbs
        return `
        <div class="input back-panel">
            <div class="input__icon-container">
                {{#if icon}}
                    <i class="input__icon material-icons">{{icon}}</i>
                {{/if}}
            </div>
            {{{InputField 
                ref="inputFieldRef"
                name=name 
                type=type
                placeholder=placeholder
                value=value
                onInput=onInput
                onBlur=onBlur
                onFocus=onFocus
                onKeydown=onKeydown
            }}}
            {{{InputError ref="errorRef" text=text}}}
        </div>
        `
    }
}