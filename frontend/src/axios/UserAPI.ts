import axios from "axios";
import { API_URL } from "./$axios"

export enum UserRole {
    ADMIN = "ADMIN",
    ROLE = "ROLE",
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const signUp = async (user: IRegister) => {
    const { data } = await axios.post(`${API_URL}/auth/register/`, user, {
        withCredentials: true,
    });
    return data;
}

export const signIn = async (user: IRegister) => {
    const { data } = await axios.post(`${API_URL}/auth/login/`, {
        email: user.email,
        password: user.password
    }, {
        withCredentials: true,
    });
    return data;
}

export const refreshUser = async () => {
    const { data } = await axios.get(`${API_URL}/auth/refresh/`, { withCredentials: true });
    return data;
}

export const logout = async () => {
    const { data } = await axios.delete(`${API_URL}/auth/logout/`, { withCredentials: true });
    return data;
}