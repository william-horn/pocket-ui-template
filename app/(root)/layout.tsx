import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Pocket Template",
  description: "A web template using Pocket UI by William Horn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
