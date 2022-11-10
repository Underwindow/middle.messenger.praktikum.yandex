import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
    rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (_, res, ctx) => {
        console.log('Call logout endpoint');

        return res(ctx.status(200));
    }),
    rest.get(`${process.env.API_ENDPOINT}/auth/user`, (_, res, ctx) => {
        console.log('Call user endpoint');

        return res(ctx.status(200));
    }),
    rest.put(`${process.env.API_ENDPOINT}/user/profile/avatar`, (_, res, ctx) => {
        console.log('Call user endpoint');

        return res(ctx.status(200));
    }),
];

const server = setupServer(...handlers);

export default server;
