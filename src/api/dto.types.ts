export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type ChatDTO = {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
    unread_count: number;
    last_message: MessageDTO;
};

export type MessageDTO = {
    user: MessageUserDTO,
    time: string,
    content: string,
};

export type MessageUserDTO = {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string,
};

export type ChatUserDTO = {
    id: number;
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
    role: 'admin' | 'regular',
};

export type ChatMessageDTO = {
    chat_id: number;
    content: string;
    file: File;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
};
