export enum ValidationType {
    INPUT_LOGIN = 'login',
    INPUT_PASSWORD = 'password',
    INPUT_EMAIL = 'email',
    INPUT_FIRST_NAME = 'first_name',
    INPUT_SECOND_NAME = 'second_name',
    INPUT_PHONE = 'phone',
    INPUT_MESSAGE = 'message',
}

export type ValidationRule = { 
    pattern: string, 
    message: string 
};

const EMPTY: ValidationRule = { 
    pattern: '^.+$',
    message: 'обязательно заполнить',
};
const NO_DIGITS: ValidationRule = { 
    pattern: '^[^0-9]*$',
    message: 'без цифр',
};
const NO_SPACES: ValidationRule = { 
    pattern: '^[^ ]*$',
    message: 'без пробелов',
};

const validationRules: { [type: string]: { [pattern: string]: string } } = {
    [ValidationType.INPUT_LOGIN]: {
        [EMPTY.pattern]: EMPTY.message,
        '^.{3,20}$': 'от 3 до 20 символов',
        '^[-_a-zA-Z0-9]+$': 'латиница, цифры, дефис и нижнее подчеркивание',
        '^(?=.*[-_a-zA-Z])[-_a-zA-Z0-9]+$': 'не может состоять полностью из цифр',
    },
    [ValidationType.INPUT_PASSWORD]: {
        [EMPTY.pattern]: EMPTY.message,
        '^.{8,40}$': 'от 8 до 40 символов',
        '^(?=.*\\p{Lu}).*$': 'обязательно хотя бы одна заглавная буква',
        '^(?=.*[0-9]).*$': 'обязательно хотя бы одна цифра',
    },
    [ValidationType.INPUT_EMAIL]: {
        [EMPTY.pattern]: EMPTY.message,
        '^\\w*@[a-zA-Z]+\\.[0-9a-zA-Z-]+$': 'некорректный email',
    },
    [ValidationType.INPUT_FIRST_NAME]: {
        [EMPTY.pattern]: EMPTY.message,
        '^[A-ZА-Я]': 'имя должно начинаться с заглавной буквы',
        '^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$': 'допустима латиница или кириллица',
        [NO_SPACES.pattern]: NO_SPACES.message,
        [NO_DIGITS.pattern]: NO_DIGITS.message,
        '^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$': 'без спецсимволов, можно только дефис',
    },
    [ValidationType.INPUT_SECOND_NAME]: {
        [EMPTY.pattern]: EMPTY.message,
        '^[A-ZА-Я]': 'фамилия должна начинаться с заглавной буквы',
        '^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$': 'допустима латиница или кириллица',
        [NO_SPACES.pattern]: NO_SPACES.message,
        [NO_DIGITS.pattern]: NO_DIGITS.message,
        '^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$': 'без спецсимволов, можно только дефис',
    },
    [ValidationType.INPUT_PHONE]: {
        [EMPTY.pattern]: EMPTY.message,
        '^.{10,15}$': 'от 10 до 15 символов',
        '^\\+?[0-9]*$': 'только цифры, может начинаться с плюса',
    },
    [ValidationType.INPUT_MESSAGE]: {
        [EMPTY.pattern]: EMPTY.message,
    },
};

export function validateValue(type: ValidationType, value: string): string | null {
    const rules = validationRules[type];

    const failedRule = Object
        .keys(rules)
        .find(pattern => !patternExists(value, pattern, 'u'));

    const errorMsg = failedRule ? rules[failedRule] : null;
    return errorMsg;

    function patternExists(value: string, pattern: string, flags?: string): boolean {
        const regex = new RegExp(pattern, flags);
        return regex.test(value);
    }
}
