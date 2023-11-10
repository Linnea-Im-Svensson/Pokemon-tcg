import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar/Navbar";
import Notification from "./_components/notification/Notification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Pokémon TCG Collection",
  description: "A pokémon collecting webgame",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <div className="h-screen w-screen bg-pokemonBackground bg-cover bg-center">
            <div className="h-screen w-screen bg-white bg-opacity-80">
              <Notification />
              <div className="fixed z-20 flex w-full items-center justify-between  px-4">
                <Navbar />
              </div>
              {modal}
              {children}
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
