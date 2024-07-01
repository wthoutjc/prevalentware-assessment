import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

// Components
import { MyDrawer } from "@/components/ui/drawer/my-drawer";
import { ApolloProviderWrapper } from "@/components/graphql/apollo-provider-wrapper";

import AuthProvider from "@/components/auth/session-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Prevalent",
  description: "",
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
            <main className="flex w-full min-h-full p-4">{children}</main>
          </ApolloProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
