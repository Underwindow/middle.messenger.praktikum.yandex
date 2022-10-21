import { APIError } from "./types";

export function hasError(response: any): response is APIError {
    return response && response.reason;
}
