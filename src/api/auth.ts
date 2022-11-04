import { http } from 'utils';
import {
    APIResponse, LoginRequestData, SignInResponseData, SignUpRequestData, SignUpResponseData, UserDTO,
} from './types';

const auth = {
    signUp: (data: SignUpRequestData) => http.post<SignUpResponseData>('auth/signup', data),

    signIn: (data: LoginRequestData) => http.post<SignInResponseData>('auth/signin', data),

    user: () => http.get<APIResponse<UserDTO>>('auth/user'),

    logout: () => http.post('auth/logout'),
};

export default auth;
