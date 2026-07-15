export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

/* Stored locally (temporary only) */
export interface StoredUser extends User {
    password: string;
}