import api from './axios'
//import type { ApiResponse } from '../types/api'
import type { User, UpdateUserInput } from '../schemas/User'

export async function getUserByIdRequest(id: string): Promise<User> {
    return await api.get(`/users/${id}`)
}


export async function updateUserRequest(id: string, data: UpdateUserInput): Promise<User> {
    return await api.patch(`/users/${id}`, data)
}

export async function deleteUserRequest(id: string): Promise<User> {
    return await api.delete(`/users/${id}`)
}