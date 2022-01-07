import Head from "next/head";
import React, { ReactNode } from "react";

export function RootLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <>
            <Head>
                <title>Tiny World</title>
                <meta name="og:title" content="Tiny World" key="title" />
                <meta name="description" content="Bitso take home project exploring graph search algorithms" key="description" />
            </Head>
            {children}
        </>
    )
}

export function getLayout(page: React.ReactNode) {
    return <RootLayout>{page}</RootLayout>
}