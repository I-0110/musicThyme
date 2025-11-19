import type { Metadata } from "next";
import { Josefin_Sans, Teachers } from "next/font/google";
import "@/app/globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const teachers = Teachers({
  variable: "--font-teachers",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Music Thyme!",
  description: "Keep your practice track all in one app.",
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${teachers.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}