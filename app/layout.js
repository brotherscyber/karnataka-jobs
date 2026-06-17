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

export const metadata = {
  title: "Karnataka Jobs - Government & Private Jobs",
  description:
    "Daily Karnataka Government and Private Job Notifications.",

  manifest: "/manifest.webmanifest",

  keywords: [
    "Karnataka Jobs",
    "Government Jobs Karnataka",
    "Private Jobs Karnataka",
    "KEA Jobs",
    "KPSC Jobs",
    "Village Accountant Recruitment",
  ],

  verification: {
    google: "Efs6n3SBFOVnyb1rExFxzeh6imNmo9V9Onmi6qZcS2k",
  },

  openGraph: {
    title: "Karnataka Jobs",
    description:
      "Daily Government & Private Job Notifications in Karnataka",
  },
};

export const viewport = {
  themeColor: "#1d4ed8",
};

export default function RootLayout({ children }) {
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
