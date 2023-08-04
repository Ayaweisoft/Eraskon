import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@fontsource/argentum-sans"
import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import firebaseConfig from '@/configs/firebase.config.js'


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  )
}
