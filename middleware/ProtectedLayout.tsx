'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/lib/store/userStore';

type Props = {
    children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
    const router = useRouter();

    const [isHydrated, setIsHydrated] = useState(false);

    const user = useAuthStore(state => state.user);
    

    useEffect(() => {
        setIsHydrated(useAuthStore.persist.hasHydrated());
    }, []);

    if (isHydrated && !user) {
        router.replace("/login");
        return;
    }

    if (!isHydrated) return <div className='flex justify-center items-center text-2xl'>Загрузка...</div>;

    return <>{children}</>;
};

export default ProtectedLayout;