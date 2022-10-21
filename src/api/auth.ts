import { http } from "utils";
import { APIError, LoginRequestData, SignInResponseData, SignUpRequestData, SignUpResponseData, UserDTO } from "./types";

export const auth = {
    signUp: (data: SignUpRequestData) =>
        http.post<SignUpResponseData>('auth/signup', data),

    signIn: (data: LoginRequestData) =>
        http.post<SignInResponseData>('auth/signin', data),

    user: () =>
        http.get<UserDTO | APIError>('auth/user'),

    logout: () =>
        http.post('auth/logout'),
};