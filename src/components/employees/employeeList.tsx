import { Employee } from '../../hooks/useEmployees'
import EmployeeItem from "./employeeItem.tsx"

interface EmployeeListProps {
    employees: Employee[]
    onDelete: (email: string) => Promise<void>
    onUpdatePermissions: (email: string, permissions: string[]) => Promise<void>
}

const EmployeeList = ({ employees, onDelete, onUpdatePermissions }: EmployeeListProps) => {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-5 gap-4 p-4 border-b">
                <div>Дата регистрации</div>
                <div>Ф.И.О</div>
                <div>Номер телефона</div>
                <div>Роль</div>
                <div>Права и доступы</div>
            </div>

            {employees.map(employee => (
                <EmployeeItem employee={employee} onDelete={onDelete} onUpdatePermissions={onUpdatePermissions}></EmployeeItem>
            ))}
        </div>
    )
}

export default EmployeeList
