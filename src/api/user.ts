import { http } from "utils";
import { APIError, ChangePasswordRequestData, ChangeProfileRequestData, LoginRequestData, SignInResponseData, SignUpRequestData, SignUpResponseData, UserDTO } from "./types";

export const user = {
    changeProfile: (data: ChangeProfileRequestData) =>
        http.put<UserDTO | APIError>('user/profile', data),

    changePassword: (data: ChangePasswordRequestData) =>
        http.put<{} | APIError>('user/password', data),

    changeAvatar: (formData: FormData) =>
        http.upload<UserDTO | APIError>('user/profile/avatar', formData),

    getUser: (data: { id: number }) =>
        http.get<UserDTO | APIError>(`user/${data.id}`),

    search: (data: { login: string }) =>
        http.post<UserDTO[] | APIError>('user/search', data),
};

