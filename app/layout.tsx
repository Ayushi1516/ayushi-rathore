import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ayushi Rathore — Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years building scalable Angular, React & Node.js applications. Based in Indore, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="font-body">
        <Providers>
          {children}
          <Toaster position="bottom-right" toastOptions={{
            style: { background: 'rgb(var(--color-surface))', color: 'rgb(var(--color-ink))', border: '1px solid rgb(var(--color-border))' }
          }} />
        </Providers>
      </body>
    </html>
  );
}
