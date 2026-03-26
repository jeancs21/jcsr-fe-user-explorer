import { usersApi } from "../api/usersApi"
import type { CreateUser, UpdateUser, User } from "../interface/user.interface"

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

export const updateUser = async (user: UpdateUser): Promise<User> => {
    const { id, ...userData } = user;
    const { data } = await usersApi.patch<User>(`/users/${id}`, userData);
    return data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await usersApi.delete(`/users/${id}`);
};