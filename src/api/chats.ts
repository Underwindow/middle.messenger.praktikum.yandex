import { http, queryStringify } from 'utils';
import {
    APIResponse, ChatDTO, ChatUserDTO, GetChatsRequestData, GetChatUsersRequestData,
} from './types';

const chats = {
    getChats: (data: GetChatsRequestData) => http.get<APIResponse<ChatDTO[]>>(`chats${queryStringify(data)}`),

    getChatUsers: (data: GetChatUsersRequestData) => http.get<APIResponse<ChatUserDTO[]>>(
        `chats/${data.id}/users${queryStringify(data as Omit<GetChatUsersRequestData, 'id'>)}`,
    ),

    createChat: (data: { title: string }) => http.post<APIResponse<{ id: number }>>('chats', data),

    addUsers: (data: { users: number[], chatId: number }) => http.put<APIResponse>('chats/users', data),

    deleteUsers: (data: { users: number[], chatId: number }) => http.delete<APIResponse>('chats/users', data),

    requestToken: (chatId: number) => http.post<APIResponse<{ token: string }>>(`chats/token/${chatId}`),

    initSocket: (userId: number, chatId: number, token: string): WebSocket => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

        socket.onopen = () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        };

        return socket;
    },
};

export default chats;
