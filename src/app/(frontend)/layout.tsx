import React from "react";
import { Instrument_Sans } from "next/font/google";
import "./styles.css";
import { AuthProviderServer } from "@/authkit/providers/auth-provider-server";
import { AppearanceProvider } from "@/authkit/providers/appearance-provider";

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

  return (
    <AppearanceProvider>
      <AuthProviderServer>
        <html lang="en">
          <body className={instrument.variable}>
            <main>{children}</main>
          </body>
        </html>
      </AuthProviderServer>
    </AppearanceProvider>
  );
}
