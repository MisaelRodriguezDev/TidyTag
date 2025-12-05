import api from './axios'
//import type { ApiResponse } from '../types/api'
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../schemas/Company'


export async function getCompany(): Promise<Company> {
    return await api.get(`/companies`)
}

export async function createCompanyRequest(data: CreateCompanyInput): Promise<Company> {
    return await api.post('/companies', data)
}

export async function updateCompanyRequest(id: string, data: UpdateCompanyInput): Promise<Company> {
    return await api.patch(`/companies/${id}`, data)
}

export async function deleteCompanyRequest(id: string): Promise<Company> {
    return await api.delete(`/companies/${id}`)
}