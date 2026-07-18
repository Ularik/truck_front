"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/users';


type Props = {
    children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
    const router = useRouter();
    const { data: user, isPending } = useMe();

    useEffect(() => {
        if (!isPending && !user) router.push("/login");
    }, [user])

    return <>{children}</>;
};

export default ProtectedLayout;