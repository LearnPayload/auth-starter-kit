import React from "react";
import { Instrument_Sans } from "next/font/google";
import "../(frontend)/styles.css";
import { getAuth } from "./_services/get-auth";
import { AuthProvider } from "./_providers/auth-provider";

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

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const { user } = await getAuth();

  return (
    <AuthProvider user={user}>
      <html lang="en">
        <body className={instrument.variable}>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
