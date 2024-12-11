import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "VillaPlace",
    template: "%s | Villaplace",
  },
  description: "Find your perfect villa",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/images/favicon-dark.png",
        href: "/assets/images/favicon-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/images/logo.png",
        href: "/assets/images/logo.png",
      },
    ]
  }
};

const geistSans = localFont({
  src: "../../public/assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= {`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
