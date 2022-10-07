export enum ValidationType {
    INPUT_LOGIN = 'login',
    INPUT_PASSWORD = 'password',
    INPUT_EMAIL = 'email',
    INPUT_FIRST_NAME = 'first_name',
    INPUT_SECOND_NAME = 'second_name',
    INPUT_PHONE = 'phone',
    INPUT_MESSAGE = 'message'
}

export type ValidateRule = {
    type: ValidationType,
    value: string
}

const validationRules: { [key: string]: { [rule: string]: string } } = {
    [ValidationType.INPUT_LOGIN]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^.{3,20}$']: 'от 3 до 20 символов',
        ['^[-_a-zA-Z0-9]+$']: 'латиница, цифры, дефис и нижнее подчеркивание',
        ['^(?=.*[-_a-zA-Z])[-_a-zA-Z0-9]+$']: 'не может состоять полностью из цифр',
    },
    [ValidationType.INPUT_PASSWORD]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^.{8,40}$']: 'от 8 до 40 символов',
        ['^(?=.*\\p{Lu}).*$']: 'обязательно хотя бы одна заглавная буква',
        ['^(?=.*[0-9]).*$']: 'обязательно хотя бы одна цифра',
    },
    [ValidationType.INPUT_EMAIL]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^\\w*@[a-zA-Z]+\\.[0-9a-zA-Z-]+$']: 'некорректный email',
    },
    [ValidationType.INPUT_FIRST_NAME]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^[A-ZА-Я]']: 'имя должно начинаться с заглавной буквы',
        ['^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$']: 'допустима латиница или кириллица',
        ['^[^ ]*$']: 'без пробелов',
        ['^[^0-9]*$']: 'без цифр',
        ['^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$']: 'без спецсимволов, можно только дефис'
    },
    [ValidationType.INPUT_SECOND_NAME]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^[A-ZА-Я]']: 'фамилия должна начинаться с заглавной буквы',
        ['^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$']: 'допустима латиница или кириллица',
        ['^[^ ]*$']: 'без пробелов',
        ['^[^0-9]*$']: 'без цифр',
        ['^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$']: 'без спецсимволов, можно только дефис'
    },
    [ValidationType.INPUT_PHONE]: {
        ['^.+$']: 'поле не может быть пустым',
        ['^.{10,15}$']: 'от 10 до 15 символов',
        ['^\\+?[0-9]*$']: 'только цифры, может начинаться с плюса',
    },
    [ValidationType.INPUT_MESSAGE]: {
        ['^.+$']: 'сообщение не может быть пустым',
    }
}

export function validateValue(type: ValidationType, value: string): string {
    const rules: { [rule: string]: string } = validationRules[type];

    let errorMsg: string = '';

    for (const [rule, error] of Object.entries(rules)) {
        const regex: RegExp = new RegExp(rule, 'u');

        if (!regex.test(value)) {
            console.log(type, errorMsg = error);
            break;
        }
    }

    return errorMsg;
}