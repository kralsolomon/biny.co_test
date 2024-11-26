import { useState } from 'react'
import { Employee } from '../../types/employee'
import PermissionsModal from './permissionsModal'

interface EmployeeItemProps {
  employee: Employee
  onDelete: (email: string) => void
  onUpdatePermissions: (email: string, permissions: string[]) => void
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({
  employee,
  onDelete,
  onUpdatePermissions,
}) => {
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
        <div className="text-sm text-gray-600">{employee.registrationDate}</div>
        <div>
          <div className="font-medium">{employee.fullName}</div>
          <div className="text-sm text-gray-500">{employee.email}</div>
        </div>
        <div className="text-gray-600">{employee.phoneNumber}</div>
        <div className="text-gray-600">{employee.role}</div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsPermissionsModalOpen(true)}
            className="text-blue-500 hover:underline"
          >
            Редактировать доступы
          </button>
          <button
            onClick={() => onDelete(employee.email)}
            className="text-red-500 hover:text-red-600"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <PermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        employee={employee}
        onUpdatePermissions={onUpdatePermissions}
      />
    </>
  )
}

const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

export default EmployeeItem