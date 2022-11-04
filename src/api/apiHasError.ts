import { APIError, APIResponse } from './types';

export default function hasError(response: APIResponse): response is APIError {
    return response && response.reason;
}
