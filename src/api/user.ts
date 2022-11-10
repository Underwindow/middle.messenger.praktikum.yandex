import { http } from 'utils';
import { UserDTO } from './dto.types';
import {
    ChangeProfileRequestData, APIResponse, ChangePasswordRequestData,
} from './request.types';

const user = {
    changeProfile: (data: ChangeProfileRequestData) => http.put<APIResponse<UserDTO>>('user/profile', data),

    changePassword: (data: ChangePasswordRequestData) => http.put<APIResponse>('user/password', data),

    changeAvatar: (formData: FormData) => http.upload<APIResponse<UserDTO>>('user/profile/avatar', formData),

    getUser: (data: { id: number }) => http.get<APIResponse<UserDTO>>(`user/${data.id}`),

    search: (data: { login: string }) => http.post<APIResponse<UserDTO[]>>('user/search', data),
};

export default user;
