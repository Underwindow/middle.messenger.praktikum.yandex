export function queryStringify(data: any): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    return `?${Object
        .entries(data)
        .map(([key, val]) => `${key}=${val}`)
        .join('&')}`;
}
