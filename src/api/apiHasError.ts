import { APIError } from './types';

export default function hasError(response: any): response is APIError {
    return response && response.reason;
}
