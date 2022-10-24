import queryStringify from './queryStringify';

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Options = {
    method: METHOD,
    credentials?: 'include' | null,
    headers?: Record<string, string>,
    body?: object,
    timeout?: number,
    tries?: number,
};

type MethodOptions = Omit<Options, 'method'>;

export class HTTPTransport {
    static fetchWithTries(url: string, options: Options): Promise<XMLHttpRequest> {
        const { tries = 1 } = options;
        const self = this;
        function onError(err: Error) {
            const triesLeft = tries - 1;
            if (!triesLeft) {
                throw err;
            }

            return self.fetchWithTries(url, { ...options, tries: triesLeft });
        }

        return this.fetch(url, options).catch(onError);
    }

    static get(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        const queryString = options.body ? queryStringify(options.body) : '';

        return this.fetchWithTries(url + queryString, { ...options, method: METHOD.GET });
    }

    static post(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetchWithTries(url, { ...options, method: METHOD.POST });
    }

    static put(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetchWithTries(url, { ...options, method: METHOD.PUT });
    }

    static delete(url: string, options: MethodOptions = {}): Promise<XMLHttpRequest | Response> {
        return this.fetchWithTries(url, { ...options, method: METHOD.DELETE });
    }

    static fetch(url: string, options: Options): Promise<XMLHttpRequest> {
        const {
            method, credentials, headers, body, timeout = 5000,
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, url, true);

            if (credentials === 'include') xhr.withCredentials = true;

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
                xhr.send(body instanceof FormData ? body : JSON.stringify(body));
            }
        });
    }
}
