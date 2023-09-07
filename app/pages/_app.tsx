import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/tailwind.css';
import { SocketProvider } from "../SocketContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp
