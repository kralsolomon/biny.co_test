import { useState } from 'react'
import mockDb from '../mock/db.json'

export type Employee = {
    email: string
    fullName?: string
    phoneNumber?: string
    registrationDate: string
    role: string
    permissions: string[]
}

export type employeeDb = {
    employees: Employee[]
}

export const useEmployees = () => {
    const [loading, setLoading] = useState(false)
    const [db, setDb] = useState<employeeDb>(mockDb)

    const fetchEmployees = async () => {
        return db.employees
    }

    const addEmployee = async (email: string): Promise<Employee> => {
        setLoading(true)


        const newEmployee: Employee = {
            email,
            registrationDate: new Date().toLocaleDateString('ru-RU'),
            role: 'Сотрудник',
            permissions: [],
            phoneNumber: '+7 777 777 77 77',
            fullName: email.split('@')[0]
        }

        setDb(prev => ({
            ...prev,
            employees: [...prev.employees, newEmployee]
        }))

        setLoading(false)
        return newEmployee
    }

    const deleteEmployee = async (email: string) => {
        setLoading(true)
        

        setDb(prev => ({
            ...prev,
            employees: prev.employees.filter(emp => emp.email !== email)
        }))

        setLoading(false)
    }

    const updatePermissions = async (email: string, permissions: string[]) => {
        setLoading(true)
        

        setDb(prev => ({
            ...prev,
            employees: prev.employees.map(emp =>
                emp.email === email ? { ...emp, permissions } : emp
            )
        }))

        setLoading(false)
    }

    return {
        loading,
        fetchEmployees,
        addEmployee,
        deleteEmployee,
        updatePermissions
    }
}
