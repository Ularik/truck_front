'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import { dashboardMenuItems } from '@/constants/constants';
import { useAuthStore } from '@/lib/store/userStore';

type Props = {
    open: boolean;
    onClose: () => void;
};

const MobileSidebar = ({ open, onClose }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    const user = useAuthStore(state => state.user);
    const logoutMutation = useAuthStore(state => state.logout);

    if (!user) return null;

    const handleLogout = async () => {
        try {
            logoutMutation();
        } finally {
            onClose();
            router.push('/login');
        }
    };

    return (
        <>
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={clsx(
                    'fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden',
                    open ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="border-b border-gray-200 px-5 py-5">
                        <Link
                            href={'admin/dashboard'}
                            onClick={onClose}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E2B6D] text-xl font-bold text-white">
                                V
                            </div>

                            <div>
                                <p className="text-base font-bold text-[#1E2B6D]">
                                    Virgin Travel
                                </p>

                                <p className="text-xs text-gray-500">
                                    Studio Dashboard
                                </p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex flex-1 flex-col gap-2 p-4">
                        {dashboardMenuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={clsx(
                                        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                                        pathname === item.href
                                            ? 'bg-[#1E2B6D] text-white'
                                            : 'text-[#1E2B6D] hover:bg-[#F3F4F6]',
                                    )}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-gray-200 p-4">
                        <div className="mb-4 rounded-2xl bg-[#F8FAFC] p-4">
                            <p className="text-sm font-semibold text-[#1E2B6D]">
                                {user.user_name}
                            </p>

                            <p className="text-xs font-medium uppercase tracking-wide text-[#39C6C5]">
                                Admin
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            // disabled={logoutMutation.isPending}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                        >
                            <LogOut size={18} />
                            {'Выйти'}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default MobileSidebar;