import {
    ChatDTO, ChatMessageDTO, ChatUserDTO, MessageDTO, MessageUserDTO, UserDTO,
} from 'api';
import { timeFormat } from 'utils';

export const transformUser = (data: UserDTO): User => ({
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
});

export const transformMessageSender = (data: MessageUserDTO): MessageSender | null => (data ? {
    firstName: data.first_name,
    secondName: data.second_name,
    avatar: data.avatar,
    email: data.email,
    login: data.login,
    phone: data.phone,
} : null);

export const transformSidebarMessage = (data: MessageDTO): SidebarChatMessage | null => (data ? {
    sender: transformMessageSender(data.user),
    time: timeFormat(data.time),
    content: data.content,
} : null);

export const transformChat = (data: ChatDTO): UserChat => ({
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    createdBy: data.created_by,
    unreadCount: data.unread_count,
    lastMessage: transformSidebarMessage(data.last_message),
});

export const transformChatUser = (data: ChatUserDTO): ChatUser => ({
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    login: data.login,
    email: data.email,
    phone: data.phone,
    avatar: data.avatar,
    role: data.role,
});

export const transformChatMessage = (data: ChatMessageDTO): ChatMessage => ({
    chatId: data.chat_id,
    content: data.content,
    file: data.file,
    id: data.id,
    isRead: data.is_read,
    time: timeFormat(data.time),
    type: data.type,
    userId: data.user_id,
});
