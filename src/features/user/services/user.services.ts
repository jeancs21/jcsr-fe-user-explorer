import { usersApi } from "../api/usersApi"
import type { CreateUser, User } from "../interface/user.interface"

export const getUsers = async (search?: string, city?: string, company?: string):Promise<User[]> => {
    const { data } = await usersApi.get<User[]>(`/users`, {
        params: { search, city, company }
    });
    return data;
};

export const getUserById = async (id: number): Promise<User> => {
    const { data } = await usersApi.get<User>(`/users/${id}`);
    return data;
};

export const createUser = async (user: CreateUser): Promise<CreateUser> => {
    const { data } = await usersApi.post<CreateUser>(`/users`, user);
    return data;
};