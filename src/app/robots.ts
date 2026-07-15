import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/dashboard",
        "/cart",
        "/checkout",
        "/orders",
        "/transactions",
        "/payment",
        "/booking",
        "/notifications",
        "/settings",
        "/personal-trainer/book",
        "/personal-trainer/success",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
