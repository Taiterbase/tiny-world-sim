import { getLayout as getRootLayout } from "layouts/root";
import React, { ReactNode } from "react";
import { MapProvider } from "providers/map-provider";

export function HomeLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <MapProvider>
            <div className="flex flex-grow min-w-screen min-h-screen bg-sky-200">
                <main className="flex flex-col justify-start flex-grow">
                    {children}
                </main>
            </div>
        </MapProvider>
    )
}

export default function getLayout(page: ReactNode) {
    return getRootLayout(<HomeLayout>{page}</HomeLayout>)
}