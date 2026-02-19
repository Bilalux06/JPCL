import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // Open Sans - Official JPCL corporate font
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "JPCL | Corporate Portal 2026",
  description: "Jamshoro Power Company Limited (GENCO-I)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}