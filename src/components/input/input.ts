import './input.css';
import Block from 'core/Block';
import { validateValue, ValidationType } from 'utils/validateValue';
import InputField, { InputFieldProps } from './input-field/inputField';
import { InputError } from './input-error';

export interface InputProps extends InputFieldProps {
    icon?: string;
    validationType?: ValidationType;
}

export default class Input extends Block<InputProps> {
    static readonly componentName: string = 'Input';

    static trasformFieldset<TData = Indexed>(fieldset: Input[]): TData {
        return fieldset.reduce(
            (data, input) => {
                data[input.name] = input.value;
                return data;
            }, {} as Indexed
        ) as TData;
    }

    static validateFieldset(fieldset: Input[]): boolean {
        let isValid = true;

        fieldset.forEach((input) => {
            const validationError = input.validate();

            if (validationError) isValid = false;
        });

        console.log(`Validation ${isValid ? 'success' : 'failed'}`);

        return isValid;
    }

    private readonly _inputEl: HTMLInputElement;

    constructor({ onInput, onFocus, validationType, ...props }: InputProps) {
        super({
            ...props,
            validationType,
            error: '',
            onInput: onInput
                ? onInput
                : () => this.validate(),
            onFocus: onFocus
                ? onFocus
                : () => {
                    if (!this._inputEl.value)
                        this.setErrorMessage('');
                    else
                        this.validate();
                },
            onBlur: () => {
                if (!this._inputEl.value)
                    this.setErrorMessage('');
            },
            onKeydown: (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    console.log('Enter submit check');
                    e.preventDefault();
                    this.validate();

                    // const validationError = this.validate();

                    // if (validationError) {
                    // e.preventDefault();
                    // }
                }
            },
        });

        this._inputEl = (this.refs.inputFieldRef as InputField).element as HTMLInputElement;
    }

    get value(): string {
        return this._inputEl.value;
    }

    set value(value: string) {
        this._inputEl.value = value;
    }

    get name(): string {
        return this._inputEl.name;
    }

    setErrorMessage(errorMessage?: string) {
        const errorRef = this.refs.errorRef as InputError;
        errorRef.setProps({ text: errorMessage });
    }

    validate(): string | null {
        const { validationType } = this.props;

        if (!validationType) return '';

        const errorMessage = validateValue(validationType, this._inputEl.value);

        if (errorMessage) {
            this.setErrorMessage(errorMessage);
        } else {
            this.setErrorMessage();
        }

        // console.log(
        //     `name: ${this._inputEl.name}`,
        //     `value: ${this._inputEl.value}`,
        //     errorMessage ? `error: ${errorMessage}` : 'success',
        // );

        return errorMessage;
    }

    protected render(): string {
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
        `;
    }
}
