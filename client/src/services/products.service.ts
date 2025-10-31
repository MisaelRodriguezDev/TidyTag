import api from './axios'
import type { ApiResponse } from '../types/api'
import type { Product, CreateProductInput, UpdateProductInput } from '../schemas/Product'

export async function getAllProductsRequest(): Promise<ApiResponse<Product[]>> {
    return await api.get('/products')
}

export async function getProductByIdRequest(id: string): Promise<ApiResponse<Product>> {
    return await api.get(`/products${id}`)
}

export async function createProductRequest(data: CreateProductInput): Promise<ApiResponse<Product>> {
    return await api.post('/products', data)
}

export async function updateProductRequest(id: string, data: UpdateProductInput): Promise<ApiResponse<Product>> {
    return await api.patch(`/products/${id}`, data)
}

export async function deleteProductRequest(id: string): Promise<ApiResponse<Product>> {
    return await api.delete(`/products/${id}`)
}