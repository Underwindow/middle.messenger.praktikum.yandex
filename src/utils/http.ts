import { queryStringify } from "./queryStringify";

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Options = {
    method: METHOD,
    headers?: Record<string, string>,
    body?: object,
    timeout?: number,
    tries?: number,
};

type MethodOptions = Omit<Options, 'method'>;

export class HTTP {
    static fetch(url: string, options: Options): Promise<XMLHttpRequest | Response> {
        const { tries = 1 } = options;
        const self = this;
        function onError(err: Error) {
            const triesLeft = tries - 1;
            if (!triesLeft) {
                throw err;
            }

            return self.fetch(url, { ...options, tries: triesLeft });
        }

        return this.request(url, options).catch(onError);
    }

    static get(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        const queryString = options.body ? queryStringify(options.body) : '';

        return this.fetch(url + queryString, { ...options, method: METHOD.GET });
    }

    static post(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetch(url, { ...options, method: METHOD.POST });
    }

    static put(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetch(url, { ...options, method: METHOD.PUT });
    }

    static delete(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetch(url, { ...options, method: METHOD.DELETE });
    }

    static request(url: string, options: Options): Promise<XMLHttpRequest> {
        const {
            method, headers, body, timeout = 5000,
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, url);

            function onLoad(): void {
                resolve(xhr);
            }

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = onLoad;

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !body) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(body));
            }
        });
    }
}
