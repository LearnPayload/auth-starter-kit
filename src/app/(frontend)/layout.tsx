import React from "react";
import { Instrument_Sans } from "next/font/google";
import "./styles.css";

const instrument = Instrument_Sans({
  weight: ["600", "700"],
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className="dark">
      <body className={instrument.variable}>
        <main>{children}</main>
      </body>
    </html>
  );
}
