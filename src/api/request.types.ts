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
