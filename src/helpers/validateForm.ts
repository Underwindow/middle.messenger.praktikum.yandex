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
        ['^.{3,20}$']: 'от 3 до 20 символов',
        ['^[-_a-zA-Z0-9]+$']: 'допустима латиница, цифры, дефис и нижнее подчеркивание',
        ['^(?=.*[-_a-zA-Z])[-_a-zA-Z0-9]+$']: 'не может состоять полностью из цифр',
    },
    [ValidationType.INPUT_PASSWORD]: {
        ['^.{8,40}$']: 'от 8 до 40 символов',
        ['^(?=.*\\p{Lu}).*$']: 'обязательно хотя бы одна заглавная буква',
        ['^(?=.*[0-9]).*$']: 'обязательно хотя бы одна цифра',
    },
    [ValidationType.INPUT_EMAIL]: {
        ['^\\w*@[a-zA-Z]+\\.[0-9a-zA-Z-]+$']: 'некорректный email',
    },
    [ValidationType.INPUT_FIRST_NAME]: {
        ['^[A-ZА-Я]']: 'имя должно начинаться с заглавной буквы',
        ['^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$']: 'имя должно состоять из латиницы или кириллицы',
        ['^[^ ]*$']: 'без пробелов',
        ['^[^0-9]*$']: 'без цифр',
        ['^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$']: 'без спецсимволов, можно только дефис'
    },
    [ValidationType.INPUT_SECOND_NAME]: {
        ['^[A-ZА-Я]']: 'фамилия должна начинаться с заглавной буквы',
        ['^(?![^a-zA-Z])[a-zA-Z\\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\\d -]*$']: 'фамилия должна состоять из латиницы или кириллицы',
        ['^[^ ]*$']: 'без пробелов',
        ['^[^0-9]*$']: 'без цифр',
        ['^[a-zA-Z-]*$|^[Ёёа-яА-Я-]*$']: 'без спецсимволов, можно только дефис'
    },
    [ValidationType.INPUT_PHONE]: {
        ['^.{10,15}$']: 'от 10 до 15 символов',
        ['^\\+?[0-9]*$']: 'только цифры, может начинаться с плюса',
    },
    [ValidationType.INPUT_MESSAGE]: {
        rule: '^.+$',
        exception: 'сообщение не может быть пустым'
    }
}

export function validateData(type: ValidationType, data: string): string {
    const rules: { [rule: string]: string } = validationRules[type];

    let errorMsg: string = '';

    for (const [rule, error] of Object.entries(rules)) {
        const regex: RegExp = new RegExp(rule, 'u');

        if (!regex.test(data)) {
            console.log(type, errorMsg = error);
            break;
        }
    }

    return errorMsg;
}

// export function validateForm(rules: ValidateData[]): string {
//     let errorMessage: string = '';

//     for (let i = 0; i < rules.length; i++) {
//         const { type, value } = rules[i];
//         if (value.length === 0) {
//             return errorMessage = 'Поле не может быть пустым';
//         }
//         let regex: RegExp;

//         if (type === ValidationType.INPUT_LOGIN) {
//             regex = new RegExp('^(?=.*[A-Za-z-_])[-_a-zA-Z0-9]{3,20}$', '');
//             errorMessage = 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них (допустимы - и _)';
//         } else if (type === ValidationType.INPUT_PASSWORD) {
//             regex = new RegExp('^(?=.*[A-ZА-Я])(?=.*[0-9])[ ЁёА-яA-Za-z\\d@$!%*^.#?&]{8,40}$', '');
//             errorMessage = 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
//         } else if (type === ValidationType.INPUT_EMAIL) {
//             regex = new RegExp('^\\w*@[a-zA-Z]+\\.[0-9a-zA-Z-]+$', '');
//             errorMessage = 'Некорректный формат';
//         } else if (type === ValidationType.INPUT_FIRST_NAME || type === ValidationType.INPUT_SECOND_NAME) {
//             regex = new RegExp('^[A-Z]+[a-zA-Z-]*$|^[ЁА-Я]+[Ёёа-яА-Я-]*$', '');
//             errorMessage = 'Имя должно начинаться с заглавной буквы и состоять из латиницы либо кириллицы  формат';
//         } else if (type === ValidationType.INPUT_PHONE) {
//             regex = new RegExp('^\\+?[0-9]{10,15}$', '');
//             errorMessage = 'Имя должно начинаться с заглавной буквы и состоять из латиницы либо кириллицы  формат';
//         }

//         if (regex.test(value)) {
//             console.log(type, 'valid');
//         }
//         else
//             return errorMessage;
//     }

//     return '';
// }