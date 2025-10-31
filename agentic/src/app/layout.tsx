import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zero-Capital Business Idea Agent",
  description:
    "Interactive agent that turns your skills into profitable, investment-free business plays with launch steps and validation moves.",
  openGraph: {
    title: "Zero-Capital Business Idea Agent",
    description:
      "Design smart business plays without investing cash. Feed the agent your strengths and get curated strategies, launch plans, and scale angles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero-Capital Business Idea Agent",
    description:
      "Feed your strengths into the agent and unlock zero-investment business plays, validation scripts, and scaling moves.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
