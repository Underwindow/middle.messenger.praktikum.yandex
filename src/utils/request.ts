import { HTTPTransport, METHOD } from 'utils';

export const baseURL = 'https://ya-praktikum.tech/api/v2';
export const resources = `${baseURL}/resources`;

const getResponseData = <T>(response: Promise<XMLHttpRequest>) => response
    .then((xhr) => {
        console.log('HTTP RESPONSE: ', xhr.response);

        const isJson = xhr
            .getResponseHeader('content-type')
            ?.includes('application/json');

        return isJson ? JSON.parse(xhr.response) : null;
    })
    .then((json) => json as T);

export const http = <T extends any>({ method, path, data }: any): Promise<T> => getResponseData<T>(
    HTTPTransport.fetchWithTries(`${baseURL}/${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Content-Security-Policy': `default-src ${baseURL}; script-src ${baseURL}; media-src ${baseURL}`,
            'X-XSS-Protection': '1; mode=block',
        },
        body: data,
    })
);

http.post = <T>(path: string, data?: any) => http<T>({ method: METHOD.POST, path, data });

http.get = <T>(path: string) => http<T>({ method: METHOD.GET, path });

http.put = <T>(path: string, data?: any) => http<T>({ method: METHOD.PUT, path, data });

http.delete = <T>(path: string, data?: any) => http<T>({ method: METHOD.DELETE, path, data });

http.upload = <T>(path: string, data?: FormData): Promise<T> => getResponseData(
    HTTPTransport.fetchWithTries(`${baseURL}/${path}`, {
        method: METHOD.PUT,
        credentials: 'include',
        body: data,
    })
);
