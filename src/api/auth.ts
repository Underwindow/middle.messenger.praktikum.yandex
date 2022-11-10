import { http } from 'utils';
import { UserDTO } from './dto.types';
import {
    SignUpRequestData, SignUpResponseData, LoginRequestData, SignInResponseData, APIResponse,
} from './request.types';

const auth = {
    signUp: (data: SignUpRequestData) => http.post<SignUpResponseData>('auth/signup', data),

    signIn: (data: LoginRequestData) => http.post<SignInResponseData>('auth/signin', data),

    user: () => http.get<APIResponse<UserDTO>>('auth/user'),

    logout: () => http.post('auth/logout'),
};

export default auth;
