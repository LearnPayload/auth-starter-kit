import { ThemeProvider } from "@/authkit/providers/theme-provider";
import { env } from "@/env.mjs";
import { Instrument_Sans } from "next/font/google";
import React from "react";
import "./styles.css";

const instrument = Instrument_Sans({
  weight: ["600", "700"],
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Payload Auth Starter Kit, your complete auth starter kit for Payload CMS",
  description:
    "A starter template for building authentication workflows with Payload and Next.js.",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  console.log({
    VERCEL_URL: env.VERCEL_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return (
    <html lang="en">
      <body className={instrument.variable} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
