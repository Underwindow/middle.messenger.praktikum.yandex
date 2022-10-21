import { HTTPTransport, METHOD } from "utils";

const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

export const baseURL = 'https://ya-praktikum.tech/api/v2';
export const resources = `${baseURL}/resources`;

export function http<T extends any>({
    method,
    path,
    data,
}: any): Promise<T> {
    return sleep().then(() => HTTPTransport.fetchWithTries(
        `${baseURL}/${path}`, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
        .then((xhr) => {
            console.log('HTTP RESPONSE: ', xhr.response);

            const isJson = xhr
                .getResponseHeader('content-type')
                ?.includes('application/json');
            
            return isJson ? JSON.parse(xhr.response) : null;
        })
        .then((data) => {
            return data as T;
        })
    );
}

http.post = <T>(path: string, data?: any) =>
    http<T>({ method: METHOD.POST, path, data });

http.get = <T>(path: string) =>
    http<T>({ method: METHOD.GET, path });

http.put = <T>(path: string, data?: any) =>
    http<T>({ method: METHOD.PUT, path, data });

http.upload = <T>(path: string, data?: FormData): Promise<T> => {
    return sleep().then(() => HTTPTransport.fetchWithTries(
        `${baseURL}/${path}`, {
        method: METHOD.PUT,
        credentials: 'include',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: data,
    })
        .then((xhr) => {
            console.log('HTTP RESPONSE: ', xhr.response);

            const isJson = xhr
                .getResponseHeader('content-type')
                ?.includes('application/json');
            
            return isJson ? JSON.parse(xhr.response) : null;
        })
        .then((data) => {
            return data as T;
        })
    );
}