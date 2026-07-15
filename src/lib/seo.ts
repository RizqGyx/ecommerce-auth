import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://s-onegym.vercel.app";

export const SITE_NAME = "S-One Gym Bukittinggi";

export const BUSINESS = {
  name: "S-One Gym",
  legalName: "S-One Gym Bukittinggi",
  description:
    "S-One Gym Bukittinggi adalah gym futuristik dengan desain neon, fasilitas modern, dan program latihan profesional untuk mencapai tubuh ideal Anda.",
  streetAddress: "Sapiran, Kec. Aur Birugo Tigo Baleh",
  addressLocality: "Kota Bukittinggi",
  addressRegion: "Sumatera Barat",
  postalCode: "26113",
  addressCountry: "ID",
  telephone: "+62-896-1846-6292",
  email: "bestsonegym@gmail.com",
  openingHours: "06:00-23:00",
  sameAs: [
    "https://www.instagram.com/s.onegym",
    "https://www.tiktok.com/@s.onegym",
    "https://www.youtube.com/@s.onegym",
    "https://www.facebook.com/profile.php?id=61575124169778",
  ],
};

/**
 * Build page-level metadata that inherits sane defaults (OG type, site name,
 * locale, canonical) so every route only has to specify what's unique to it.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? "/Hero.png";

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD structured data for the gym as a local business, rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    logo: `${SITE_URL}/Icon.png`,
    image: `${SITE_URL}/Hero.png`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: "Rp150.000 - Rp500.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "23:00",
    },
    sameAs: BUSINESS.sameAs,
  };
}
