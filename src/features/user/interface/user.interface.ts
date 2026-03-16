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

export interface UpdateUser extends CreateUser {
    id: number;
}
