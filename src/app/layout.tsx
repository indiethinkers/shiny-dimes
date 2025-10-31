import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import { fetchStoriesData } from './actions';
import StoriesProvider from '@/components/StoriesProvider';
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
  title: "Shiny Dimes",
  description: "A curated collection of quotes from the brightest minds on the internet.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ]
  },
  openGraph: {
    images: [{ url: "/open-graph-image.png" }]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stories = await fetchStoriesData();

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-website-id="dfid_CvSjK411AuU6GH6gCkdm3"
          data-domain="shinydimes.xyz"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
        <StoriesProvider stories={stories}>
          {children}
        </StoriesProvider>
      </body>
    </html>
  );
}
