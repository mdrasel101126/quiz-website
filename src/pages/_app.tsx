/* import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
 */

/* import "@/styles/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/redux/store";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }:AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </SessionProvider>
  );
} */

import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import store from "@/redux/store";
import type { Page } from '../types/page'

type Props = AppProps & {
  Component: Page
}
export default function App ({ Component, pageProps }: Props)  {
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
  
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  
  )
}

