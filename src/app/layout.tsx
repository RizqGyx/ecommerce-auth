import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import LayoutWrapper from "@/components/templates/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S-One Gym Bukittinggi | Gym & Pusat Kebugaran Fisik",
  description:
    "S-One Gym Bukittinggi - Gym futuristik dengan desain neon, fasilitas modern, dan program latihan profesional untuk mencapai tubuh ideal Anda.",
  keywords: [
    "S-One Gym Bukittinggi",
    "s.onegym",
    "gym Bukittinggi",
    "fitness Bukittinggi",
    "futuristic gym",
    "More than a Gym",
    "It's Your Space",
    "neon gym",
    "personal training",
    "cardio",
    "strength training",
    "Fitness",
    "Aerobic",
    "Zumba",
    "Poundfit",
    "Muaythai",
    "Calisthenics",
    "Sauna",
  ],
  icons: {
    icon: "/Icon.png",
    shortcut: "/Icon.png",
    apple: "/Icon.png",
  },
  authors: [{ name: "S-One Gym Bukittinggi" }],
  openGraph: {
    title: "S-One Gym Bukittinggi | Gym & Pusat Kebugaran Fisik",
    description:
      "Rasakan pengalaman fitness futuristik di S-One Gym Bukittinggi — fasilitas modern, desain neon, dan pelatih profesional.",
    url: "https://s-onegym.vercel.app",
    siteName: "S-One Gym Bukittinggi",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
