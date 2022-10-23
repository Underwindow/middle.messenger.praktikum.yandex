function queryStringify(data: any): string | never {
    if (!isPlainObject(data)) {
        throw new Error('data must be object type');
    }

    return `?${Object.entries(data).map(([key, value]) => {
        return getParameter(key, value);
    }).join('&')}`;
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function getParameter(key: string, data: unknown, path: string[] = []): string {
    if (isArrayOrObject(data)) {
        return Object
            .entries(data)
            .map(([i, value]) => getParameter(key, value, [...path, i]))
            .join('&');
    }
    else {
        return `${key}${path.map(i => `[${i}]`).join('')}=${data}`;
    }
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}

export default queryStringify

// const obj: StringIndexed = {
//     key: 1,
//     key2: 'test',
//     key3: false,
//     key4: true,
//     key5: [1, 2, 3],
//     key6: { a: 1 },
//     key7: { b: { d: 2 } },
// };

// queryStringify(obj); // 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'