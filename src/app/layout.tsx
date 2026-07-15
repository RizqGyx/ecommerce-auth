import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/templates/LayoutWrapper";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SITE_URL, SITE_NAME, organizationJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "S-One Gym Bukittinggi | Gym & Pusat Kebugaran Fisik",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "S-One Gym Bukittinggi - Gym futuristik dengan desain neon, fasilitas modern, dan program latihan profesional untuk mencapai tubuh ideal Anda.",
  keywords: [
    "S-One Gym Bukittinggi",
    "gym Bukittinggi",
    "fitness Bukittinggi",
    "personal training Bukittinggi",
    "kelas Zumba Bukittinggi",
    "membership gym Bukittinggi",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/Icon.png", type: "image/png", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/Icon.png",
  },
  authors: [{ name: "S-One Gym Bukittinggi" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "S-One Gym Bukittinggi | Gym & Pusat Kebugaran Fisik",
    description:
      "Rasakan pengalaman fitness futuristik di S-One Gym Bukittinggi — fasilitas modern, desain neon, dan pelatih profesional.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/Hero.png",
        width: 1200,
        height: 630,
        alt: "Interior S-One Gym Bukittinggi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S-One Gym Bukittinggi | Gym & Pusat Kebugaran Fisik",
    description:
      "S-One Gym Bukittinggi - Gym futuristik dengan desain neon, fasilitas modern, dan program latihan profesional.",
    images: ["/Hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <AuthProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </AuthProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
