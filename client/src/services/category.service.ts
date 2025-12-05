import api from './axios'
//import type { ApiResponse } from '../types/api'
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../schemas/Category'

export async function getAllCategoriesRequest(): Promise<Category[]> {
    return await api.get('/categories')
}

export async function getCategoryByIdRequest(id: string): Promise<Category> {
    return await api.get(`/categories/${id}`)
}

export async function createCategoryRequest(data: CreateCategoryInput): Promise<Category> {
    return await api.post('/categories', data)
}

export async function updateCategoryRequest(id: string, data: UpdateCategoryInput): Promise<Category> {
    return await api.patch(`/categories/${id}`, data)
}

export async function deleteCategoryRequest(id: string): Promise<Category> {
    return await api.delete(`/categories/${id}`)
}