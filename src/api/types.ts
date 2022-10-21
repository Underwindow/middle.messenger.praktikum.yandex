export type APIError = {
    reason: string;
};

export type SignUpRequestData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
};

export type SignUpResponseData = { id: string } | APIError;

export type LoginRequestData = {
    login: string;
    password: string;
};

export type SignInResponseData = {} | APIError;

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