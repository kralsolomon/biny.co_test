import { useState } from 'react';
import { Employee, Permission } from '../../types/employee';

interface PermissionsModalProps {
    isOpen: boolean
    onClose: () => void
    employee: Employee
    onUpdatePermissions: (email: string, permissions: string[]) => void
}

const AVAILABLE_PERMISSIONS: Permission[] = [
    { key: 'create_orders', label: 'Создавать новые заказы' },
    { key: 'delete_orders', label: 'Удалять заказы' },
    { key: 'add_employees', label: 'Добавлять сотрудников' },
    { key: 'view_analytics', label: 'Смотреть Аналитику' },
    { key: 'view_balance', label: 'Смотреть Баланс компании' },
]

const PermissionsModal: React.FC<PermissionsModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               employee,
                                                               onUpdatePermissions,
                                                           }) => {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        employee.permissions
    )



    if (!isOpen) return null


    const handleSave = async () => {
        onUpdatePermissions(employee.email, selectedPermissions)
        onClose()
    }

    const togglePermission = (permission: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-medium">Редактирование доступов</h3>
                        <p className="text-sm text-gray-600 mt-1">{employee.email}</p>
                        <p className="text-sm text-gray-600">+{employee.phoneNumber}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    {AVAILABLE_PERMISSIONS.map(({ key, label }) => (
                        <label
                            key={key}
                            className="flex items-center space-x-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPermissions.includes(key)}
                                onChange={() => togglePermission(key)}
                                className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                            />
                            <span className="text-sm">{label}</span>
                        </label>
                    ))}
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleSave}
                        className="w-full bg-[#FA1861] text-white py-2 rounded-lg hover:bg-[#FA1869] transition-colors"
                    >
                        Сохранить изменения
                    </button>
                    <button
                        onClick={() => {
                            const employeeEmail = employee.email;
                            onClose();
                            onUpdatePermissions(employeeEmail, []);
                        }}
                        className="w-full text-gray-500 hover:text-gray-600 text-sm"
                    >
                        Удалить сотрудника
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PermissionsModal