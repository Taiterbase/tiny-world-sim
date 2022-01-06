import { SWRConfig } from "swr";
import { getLayout as getRootLayout } from "layouts/root";
import React, { ReactNode } from "react";

export function HomeLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: true,
                revalidateOnReconnect: true,
                revalidateOnMount: true,
                refreshWhenHidden: false,
                refreshWhenOffline: false,
                refreshInterval: 0,
            }}
        >
            <div className="min-h-full min-w-full bg-blue-150">
                <main className="pl-28 overflow-y-scroll p-6 pt-20 min-h-screen min-w-full flex justify-center flex-grow">
                    {children}
                </main>
            </div>
        </SWRConfig>
    )
}

export default function getLayout(page: React.ReactNode) {
    return getRootLayout(<HomeLayout>{page}</HomeLayout>)
}