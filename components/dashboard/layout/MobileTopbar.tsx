'use client';

import { useMe } from '@/hooks/users';
import { Menu } from 'lucide-react';

type Props = {
    onMenuClick: () => void;
};

const MobileTopbar = ({ onMenuClick }: Props) => {
    const {data: user} = useMe();

    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
            <div>
                <p className="text-sm font-semibold text-[#1E2B6D]">
                    Nur-star
                </p>

                <p className="text-xs text-gray-500">
                    {user ? `${user.user_name} · admin` : 'Dashboard'}
                </p>
            </div>

            <button
                type="button"
                aria-label="Открыть меню"
                onClick={onMenuClick}
                className="rounded-xl border border-gray-200 p-2 text-[#1E2B6D] transition hover:bg-gray-100"
            >
                <Menu size={22} />
            </button>
        </header>
    );
};

export default MobileTopbar;