import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

// Components
import { MyDrawer } from "@/components/ui/drawer/my-drawer";
import { ApolloProviderWrapper } from "@/components/graphql/apollo-provider-wrapper";

import AuthProvider from "@/components/auth/session-provider";
import MyBreadcum from "@/components/ui/breadcums/my-breadcum";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Prevalentware Assessment",
  description: "Assessment for Prevalentware",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex font-sans min-h-screen", fontSans.variable)}>
        <AuthProvider>
          <ApolloProviderWrapper>
            <MyDrawer />
            <main className="flex flex-col w-full min-h-full p-4">
              <MyBreadcum />
              <div className="flex w-full min-h-full">{children}</div>
            </main>
          </ApolloProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
