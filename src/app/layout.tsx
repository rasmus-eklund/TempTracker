import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/NavBar";
import { env } from "~/env";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: env.NODE_ENV === "development" ? "DEV: TempTracker" : "TempTracker",
  description: "Track your temperature over time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex h-screen flex-col`}>
        <TRPCReactProvider>
          <NavBar />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
