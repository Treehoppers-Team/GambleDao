import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";
import BgVideo from "@/components/BgVideo";
import { WalletProvider} from "@/context/WalletContext";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="appContainer">
      <Head>
        <title>GambleDao</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletProvider>
        <NavBar />
        <div className="bgContainer">
          <BgVideo />
          <Component {...pageProps} />
        </div>
      </WalletProvider>
    </div>
  );
}