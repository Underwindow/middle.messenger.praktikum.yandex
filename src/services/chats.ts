import {
    chats as chatsApi,
    apiHasError,
    GetChatsRequestData,
    GetChatUsersRequestData,
    ChatMessageDTO,
    transformChat,
    transformChatMessage,
    transformChatUser,
} from 'api';

const socketPingInterval: number = 5000;

const chatsService = {
    createChat: async (
        action: { title: string },
    ): Promise<{ id: number } | null> => {
        const response = await chatsApi.createChat(action);

        if (apiHasError(response)) {
            console.log('---ERROR createChat', response.reason);
            alert(response.reason);

            return null;
        }

        return response;
    },

    deleteChat: async (
        action: { chatId: number },
    ): Promise<Indexed | null> => {
        const response = await chatsApi.deleteChat(action);

        if (apiHasError(response)) {
            console.log('---ERROR createChat', response.reason);
            alert(response.reason);

            return null;
        }

        alert('Чат удалён');

        return response;
    },

    getChats: async (
        action: GetChatsRequestData,
    ): Promise<UserChat[] | null> => {
        const response = await chatsApi.getChats(action);

        if (apiHasError(response)) {
            console.log('---ERROR getChats', response.reason);

            return null;
        }

        const userChats = response.map((chatDTO) => transformChat(chatDTO));

        return userChats;
    },

    getChatUsers: async (
        action: GetChatUsersRequestData,
    ): Promise<ChatUser[] | null> => {
        console.log(action);

        const responseChatUsers = await chatsApi.getChatUsers(action);

        if (apiHasError(responseChatUsers)) {
            console.log('---ERROR getUsers', responseChatUsers.reason);

            return null;
        }

        const chatUsers = responseChatUsers.map((chatUserDTO) => transformChatUser(chatUserDTO));

        return chatUsers;
    },

    addChatUsers: async (
        action: { users: number[], chatId: number },
    ): Promise<null | {}> => {
        const response = await chatsApi.addUsers(action);

        if (apiHasError(response)) {
            console.log('---ERROR getChats', response.reason);
            alert(response.reason);

            return response;
        }

        alert('Участники добавлены');

        return null;
    },

    deleteChatUsers: async (
        action: { users: number[], chatId: number },
    ): Promise<null | {}> => {
        const response = await chatsApi.deleteChat(action);

        if (apiHasError(response)) {
            console.log('---ERROR getChats', response.reason);
            alert(response.reason);

            return response;
        }

        alert('Участники исключены');

        return null;
    },

    getChatToken: async (
        chatId: number,
    ): Promise<string | null> => {
        const responseToken = await chatsApi.requestToken(chatId);

        if (apiHasError(responseToken)) {
            console.log('---ERROR getChatToken', responseToken.reason);

            return null;
        }

        return responseToken.token;
    },

    connectUserToChat: async (
        userId: number,
        chatId: number,
        token: string,
        onMessage?: (messages: ChatMessage[], last: number, isOld: boolean) => void,
    ): Promise<WebSocket> => {
        const socket = chatsApi.initSocket(userId, chatId, token);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'error' || data.type === 'user connected') return;
            console.log('Получено сообщение', data);

            const isOld = Array.isArray(data);
            const chatMessagesDTO = Array.isArray(data)
                ? data.map((message) => message as ChatMessageDTO)
                : [data as ChatMessageDTO | undefined];

            chatMessagesDTO?.reverse();

            const last = chatMessagesDTO[0]?.id;

            const messages = chatMessagesDTO
                .filter((chatMessageDTO) => chatMessageDTO) // filter of ping
                .map((chatMessageDTO) => transformChatMessage(chatMessageDTO!))
                .filter((message) => message.content); // filter of empty messages (if exists)

            if (onMessage && last) onMessage(messages, last, isOld);
        };

        const intervalID = setInterval(() => {
            socket.send('');
            console.log('ping');
        }, socketPingInterval);

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            clearTimeout(intervalID);

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        };

        socket.onerror = (event) => {
            console.log('Ошибка', event);

            socket.close();
        };

        return socket;
    },

    sendMessage: (message: string, socket: WebSocket): void => {
        socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    },

    loadOldMessages: (socket: WebSocket, from: number): void => {
        socket.send(JSON.stringify({
            content: `${from}`,
            type: 'get old',
        }));
    },
};

export default chatsService;
