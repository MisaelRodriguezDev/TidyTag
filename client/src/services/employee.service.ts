import api from './axios'
//import type { ApiResponse } from '../types/api'
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '../schemas/Employee'

export async function getAllEmployeesRequest(): Promise<Employee[]> {
    return await api.get('/employees')
}

export async function getEmployeeByIdRequest(id: string): Promise<Employee> {
    return await api.get(`/employees/${id}`)
}

export async function createEmployeeRequest(data: CreateEmployeeInput): Promise<Employee> {
    return await api.post('/employees', data)
}

export async function updateEmployeeRequest(id: string, data: UpdateEmployeeInput): Promise<Employee> {
    return await api.patch(`/employees/${id}`, data)
}

export async function deleteEmployeeRequest(id: string): Promise<Employee> {
    return await api.delete(`/employees/${id}`)
}