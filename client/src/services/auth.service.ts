import api from "./axios";
//import type { ApiResponse } from "../types/api";
import type { User, CreateUserInput, LoginInput } from "../schemas/User";

export async function registerRequest(data: CreateUserInput): Promise<User> {
    return await api.post("/auth/register", data)
}

export async function loginRequest(data: LoginInput): Promise<User> {
    return await api.post("/auth/login", data)
}