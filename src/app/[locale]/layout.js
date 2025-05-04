import "../globals.css";
import { Inter, Signika_Negative } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "../auth/Provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientSideUtilites from "./ClientSideUtilities";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "./SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link
          rel="shortcut icon"
          href="/img/Trading.jpeg"
          type="image/x-icon"
        />
        <meta
          name="description"
          content="Sign up With Trade Experts Market to join thousands of traders currently benefiting from high leveraged full STP/ECN CFD trading with zero conflict of interest through tier one liquidity."
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientSideUtilites />
          <AuthProvider>
            <ThemeProvider attribute="class">
              <Theme appearance="dark">
                <SessionWrapper>{children}</SessionWrapper>
              </Theme>
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
