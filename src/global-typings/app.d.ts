declare global {
    export type Props = Record<string, any>;
    export type References = Record<string, Block<any> | Block<any>>;
    export type Nullable<T> = T | null;
    export type Callback<T = unknown> = (...args: any[]) => T;
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

export { };
