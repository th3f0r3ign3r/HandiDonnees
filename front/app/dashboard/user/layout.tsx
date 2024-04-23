import React, { ReactNode } from 'react';
import SideBar from '@/components/sidebar';


interface Props {
    children?: ReactNode
}

export default function Layout({ children, ...props }: Props) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideBar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
        </div>
    );
}
