export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    city: string;
}

export interface CreateUser {
    name: string;
    email: string;
    phone: string;
    company: string;
    city: string;
}

export interface UpdateUser {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    city?: string;
}

export type UserFilterType = "city" | "company" | "none";
