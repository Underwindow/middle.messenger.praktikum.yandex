declare global {
    export type Nullable<T> = T | null;
    export type Callback<T = unknown> = (...args: any[]) => T;
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export type Indexed = { [key: string]: any };
    export type Props = Record<string, any>;
    
    export type AppState = {
        appIsInited: boolean;
        screen: Screens | null;
        isLoading: boolean;
        loginFormError: string | null;
        user: User | null;
        userChats: UserChat[] | null;
    };

    export type User = {
        id: number;
        login: string;
        firstName: string;
        secondName: string;
        displayName: string;
        avatar: string;
        phone: string;
        email: string;
    };

    export type UserChat = {
        id: number;
        title: string;
        avatar: string;
        createdBy: number;
        unreadCount: number;
        lastMessage: SidebarChatMessage | null;
    };

    export type SidebarChatMessage = {
        sender: MessageSender | null;
        time: string;
        content: string;
    };
    
    export type MessageSender = {
        firstName: string;
        secondName: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
    };

    export type ChatUser = User & {
        displayName: string,
        role: 'admin' | 'regular',
    };

    export type ChatMessage = {
        chatId: number;
        content: string;
        file: File;
        id: number;
        isRead: boolean;
        time: string;
        type: string;
        userId: number;
    };
}

export { };
