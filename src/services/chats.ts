import { APIError, apiHasError, ChatDTO, ChatMessageDTO, chats, GetChatsRequestData, GetChatUsersRequestData, transformChat, transformChatMessage, transformChatUser } from "api";
import { Dispatch } from "core";

export const createChat = async (
    action: { title: string },
): Promise<{ id: number } | null> => {
    const response = await chats.createChat(action);

    if (apiHasError(response)) {
        console.log('---ERROR createChat', response.reason);
        alert(response.reason);

        return null;
    }

    return response;
};

export const getChats = async (
    action: GetChatsRequestData,
): Promise<UserChat[] | null> => {
    const response = await chats.getChats(action);

    if (apiHasError(response)) {
        console.log('---ERROR getChats', response.reason);

        return null;
    }

    const userChats = response.map(chatDTO => transformChat(chatDTO));

    return userChats;
};

export const getChatUsers = async (
    action: GetChatUsersRequestData,
): Promise<ChatUser[] | null> => {
    const responseChatUsers = await chats.getChatUsers(action);

    if (apiHasError(responseChatUsers)) {
        console.log('---ERROR getUsers', responseChatUsers.reason);

        return null;
    }

    const chatUsers = responseChatUsers.map(chatUserDTO => transformChatUser(chatUserDTO));

    return chatUsers;
};

export const addChatUsers = async (
    action: { users: number[], chatId: number },
): Promise<null | APIError> => {
    const response = await chats.addUsers(action);

    if (apiHasError(response)) {
        console.log('---ERROR getChats', response.reason);
        alert(response.reason);

        return response;
    }

    alert('Участники добавлены');

    return null;
};

export const deleteChatUsers = async (
    action: { users: number[], chatId: number },
): Promise<null | APIError> => {
    const response = await chats.deleteUsers(action);

    if (apiHasError(response)) {
        console.log('---ERROR getChats', response.reason);
        alert(response.reason);

        return response;
    }

    alert('Участники исключены');

    return null;
};

export const getChatToken = async (
    chatId: number,
): Promise<string | null> => {
    const responseToken = await chats.requestToken(chatId);

    if (apiHasError(responseToken)) {
        console.log('---ERROR getChatToken', responseToken.reason);

        return null;
    }

    return responseToken.token;
};

const socketPingInterval: number = 5000;

export const connectUserToChat = (
    userId: number, chatId: number, token: string, 
    onMessage?: (messages: ChatMessage[]) => void,
    onClose?: (socket: WebSocket) => void,
): WebSocket => {
    const socket = chats.initSocket(userId, chatId, token);

    socket.onmessage = (event) => {
        console.log('onmessage');

        const data = JSON.parse(event.data);
        console.log(data);
        
        if (data.type === 'error')
            return;

        const chatMessagesDTO = Array.isArray(data)
            ? data.map((message) => message as ChatMessageDTO)
            : [data as ChatMessageDTO];

        const messages = chatMessagesDTO
            .map((chatMessageDTO) => transformChatMessage(chatMessageDTO))
            .filter(message => message.content)
            .reverse();

        console.log(messages);

        if (onMessage && messages.length > 0)
            onMessage(messages);
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
};

export const sendMessage = (
    message: string, socket: WebSocket
): void => {
    socket.send(JSON.stringify({
        content: message,
        type: 'message',
    }));
};