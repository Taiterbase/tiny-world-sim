import { SWRConfig } from "swr";
import BackgroundSplash from "./components/background-splash";
import HomeHeader from "./components/home-header";
import { getLayout as getRootLayout } from "layouts/root";

export function HomeLayout(props) {
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
                <HomeHeader />
                <main className="pl-28 overflow-y-scroll p-6 pt-20 min-h-screen min-w-full flex justify-center flex-grow">
                    {children}
                </main>
                <BackgroundSplash />
            </div>
        </SWRConfig>
    )
}

export default function getLayout(page) {
    return getRootLayout(<HomeLayout>{page}</HomeLayout>)
}