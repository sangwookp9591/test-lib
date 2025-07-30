// src/shared/providers/MockServiceWorker/MockServiceWorkerProvider.tsx
'use client';

import { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

export function MockServiceWorkerProvider({ children }: Props) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
            import('../../mocks/initMock').then((mod) => mod.initMock());
        }
    }, []);

    return <>{children}</>;
}
