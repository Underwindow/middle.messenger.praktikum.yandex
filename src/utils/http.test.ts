import { HTTPTransport, METHOD } from './httpTransport';
import { baseURL } from './request';

describe('utils/request', () => {
    const headers = {
        'Content-Type': 'application/json',
        'Content-Security-Policy': `default-src ${baseURL}; script-src ${baseURL}; media-src ${baseURL}`,
        'X-XSS-Protection': '1; mode=block',
    };

    it('should send get request', async () => {
        const response = await HTTPTransport.fetchWithTries(`${baseURL}/auth/user`, {
            method: METHOD.GET,
            credentials: 'include',
            headers
        });

        expect(response.status).toEqual(200);
    });

    it('should send post request', async () => {
        const response = await HTTPTransport.fetchWithTries(`${baseURL}/auth/logout`, {
            method: METHOD.POST,
            credentials: 'include',
            headers
        });

        expect(response.status).toEqual(200);
    });

    it('should send put request', async () => {
        const response = await HTTPTransport.fetchWithTries(`${baseURL}/user/profile/avatar`, {
            method: METHOD.PUT,
            credentials: 'include',
        });

        expect(response.status).toEqual(200);
    });
});
