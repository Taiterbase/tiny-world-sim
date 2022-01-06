import Head from "next/head";
import React, { ReactNode } from "react";
import { SWRConfig } from "swr";

export function RootLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <>
        <Head>
            <title>Tiny World</title>
            <meta name="og:title" content="Tiny World" key="title" />
            <meta name="description" content="Bitso take home project exploring graph search algorithms" key="description" />
        </Head>
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
            {children}
        </SWRConfig>
            </>
    )
}

export function getLayout(page: React.ReactNode) {
    return <RootLayout>{page}</RootLayout>
}