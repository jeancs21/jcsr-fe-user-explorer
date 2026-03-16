import { usersApi } from "../api/usersApi"
import type { CreateUser, User } from "../interface/user.interface"

export const getUsers = async ():Promise<User[]> => {
    const { data } = await usersApi.get<User[]>(`/users`);
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