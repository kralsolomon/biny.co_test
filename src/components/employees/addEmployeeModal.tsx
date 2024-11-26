import { useState } from 'react';
import {Employee} from "../../types/employee.ts";

interface AddEmployeeModalProps {
    employees: Employee[]
    isOpen: boolean;
    onClose: () => void;
    onAdd: (email: string) => void;
    onDelete: (email: string) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
                                                               employees,
                                                               isOpen,
                                                               onClose,
                                                               onAdd,
                                                               onDelete,
                                                           }) => {
    const [email, setEmail] = useState('');
    const [inviteLink, setInviteLink] = useState('');

    if (!isOpen) return null;

    const handleInvite = () => {
        onAdd(email)
        setEmail('')
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Добавление сотрудников</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-2">
                        Почта сотрудника
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите почту сотрудника чтобы пригласить"
                            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleInvite();
                                }
                            }}
                        />
                    </div>
                </div>

                {employees.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm text-gray-600 mb-2">Сотрудники</h4>
                        <div className="space-y-2">
                            {employees.map((employee) => (
                                <div
                                    key={employee.email}
                                    className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                                >
                                    <span className="text-sm">{employee.email}</span>
                                    <button
                                        onClick={() => onDelete(employee.email)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-600">Ссылка</label>
                        <button
                            className="text-sm text-gray-400"
                            onClick={() => {
                                if (inviteLink) {
                                    navigator.clipboard.writeText(inviteLink);
                                }
                            }}
                        >
                            <ClipboardIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={inviteLink || 'biny.co/atlant/213fjdas'}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Или поделитесь ссылкой чтобы по ссылке приглашать сотрудников
                    </p>
                </div>

                <button
                    onClick={handleInvite}
                    disabled={email.length === 0}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Пригласить
                </button>
            </div>
        </div>
    );
};

const ClipboardIcon = ({ className }: { className?: string }) => (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
    </svg>
);

export default AddEmployeeModal