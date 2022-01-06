import Head from "next/head";
import { SWRConfig } from "swr";

export function RootLayout(props) {
    const { children } = props;
    return (
        <>
        <Head>
            <title>Zifi</title>
            <meta name="og:title" content="Zifi" key="title" />
            <meta name="description" content="Next.js Web Template free to use for learners and scholars" key="description" />
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

export function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}