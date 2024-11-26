import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.FC<{ className?: string }>;
    path: string;
}

const sidebarItems: SidebarItem[] = [
    {
        id: 'orders',
        label: 'Заказы',
        path: '/orders',
        icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
        )
    },
    {
        id: 'draft',
        label: 'Черновик',
        path: '/draft',
        icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    },
    {
        id: 'analytics',
        label: 'Аналитика',
        path: '/analytics',
        icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        id: 'employees',
        label: 'Сотрудники',
        path: '/employees',
        icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    },
    {
        id: 'balance',
        label: 'Баланс',
        path: '/balance',
        icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="bg-[#E6E0EC] bg-opacity-30 w-64 min-h-screen border-r">
            <div className="p-4">
                <img src="/biny_logo.png" alt="Logo" className="h-14" />
            </div>

            <nav className="mt-8">
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center space-x-3 px-6 py-3 text-sm ${
                                isActive
                                    ? 'bg-pink-50 text-[#FA1861] border-r-2 border-[#FA1861]'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#FA1861]' : 'text-gray-500'}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-8 left-0 w-64 p-4">
                <div className="flex items-center space-x-2 px-6">
                    <img src="/lang%20selector.png" alt="Language" className="w-10 h-10" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;