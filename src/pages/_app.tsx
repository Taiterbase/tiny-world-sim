import "../styles/globals.css";

import { RootLayout } from "layouts/root";

export default function App({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>);
    return getLayout(<Component {...pageProps} />);
}
