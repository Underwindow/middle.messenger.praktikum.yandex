export type APIError = {
    status: number;
    reason: string;
};

export type APIResponse<T = {} & Indexed> = T | APIError;

export type SignUpRequestData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
};

export type SignUpResponseData = APIResponse<{ id: string }>;

export type LoginRequestData = {
    login: string;
    password: string;
};

export type SignInResponseData = APIResponse;

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

export type ChangeProfileRequestData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type ChangePasswordRequestData = {
    oldPassword: string;
    newPassword: string;
};

export type GetChatsRequestData = {
    offset?: number;
    limit?: number;
    title?: string;
};

export type GetChatUsersRequestData = {
    id?: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
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
