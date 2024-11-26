import React from 'react';
import { useState, useEffect } from 'react';
import { useEmployees, Employee } from '../../hooks/useEmployees.ts';
import AddEmployeeModal from '../employees/addEmployeeModal';
import EmployeeList from "../employees/employeeList.tsx";

interface HeaderProps {
    companyName: string;
    companyBIN: string;
}

const Header: React.FC<HeaderProps> = ({ companyName, companyBIN }) => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { loading, fetchEmployees, addEmployee, deleteEmployee, updatePermissions } = useEmployees();


    useEffect(() => {
        const getEmployees = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };
        getEmployees();
    });

    const handleAddEmployee = async (email: string) => {
        try {
            const newEmployee = await addEmployee(email);
            setEmployees(prev => [...prev, newEmployee]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEmployee = async (email: string) => {
        try {
            await deleteEmployee(email);
            setEmployees(prev => prev.filter(emp => emp.email !== email));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdatePermissions = async (email: string, permissions: string[]) => {
        try {
            await updatePermissions(email, permissions);
            setEmployees(prev => prev.map(emp =>
                emp.email === email ? { ...emp, permissions } : emp
            ));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="bg-white border-b">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button className="text-gray-400 bg-[#E6E0EC] bg-opacity-30 p-2 rounded-md">
                        <RefreshIcon className="w-5 h-5"/>
                    </button>
                    <span className="text-sm text-gray-500">
                        <h1 className="text-2xl font-semibold">Сотрудники</h1>
                        Обновлено 38 секунд назад
                    </span>
                    <div className="flex justify-between items-center">

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-[#FA1861] text-white mx-2 px-4 py-3 rounded-lg"
                            disabled={loading}
                        >
                            + Добавить сотрудника
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="relative">
                        <BellIcon className="w-6 h-6 text-gray-500"/>
                        <span
                            className="absolute -top-1 -right-1 bg-[#FA1861] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                             3
                        </span>
                    </button>

                    <div className="flex items-center space-x-3 text-right">
                        <img src="/org_logo.png" alt="Company" className="w-8 h-8 rounded"/>
                        <div>
                            <div className="font-medium">{companyName}</div>
                            <div className="text-sm text-gray-500">БИН {companyBIN}</div>
                        </div>
                    </div>
                </div>
            </div>

            <AddEmployeeModal
                employees={employees}
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddEmployee}
                onDelete={handleDeleteEmployee}
            />

            {loading && employees.length === 0 ? (
                <div>Loading...</div>
            ) : employees.length === 0 ? (
                <div className="text-center py-12">
                    <img
                        src="/no_employees.png"
                        alt="No employees"
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-xl mb-2">У вас еще нет сотрудников</h2>
                    <p className="text-gray-600">
                        Вы можете добавить сотрудников. И управлять их доступами на этой странице
                    </p>
                </div>
            ) : (
                <EmployeeList
                    employees={employees}
                    onDelete={handleDeleteEmployee}
                    onUpdatePermissions={handleUpdatePermissions}
                />
            )}
        </header>
    );
};

const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export default Header;