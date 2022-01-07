import { SWRConfig } from "swr";
import { getLayout as getRootLayout } from "layouts/root";
import React, { ReactNode } from "react";
import { MapProvider } from "providers/map-provider";

export function HomeLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <MapProvider>
            <div className="min-h-full min-w-full bg-blue-150">
                <main className="overflow-y-scroll p-2 min-h-screen min-w-full flex justify-center flex-grow">
                    {children}
                </main>
            </div>
        </MapProvider>
    )
}

export default function getLayout(page: ReactNode) {
    return getRootLayout(<HomeLayout>{page}</HomeLayout>)
}