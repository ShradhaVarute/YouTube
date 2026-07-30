import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/lib/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-white text-black">
        <Header />

        <div className="flex">
          <Sidebar />

          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </UserProvider>
  );
};