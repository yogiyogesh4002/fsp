import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";

type PageMeta = { title: string; description: string; path: string };

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` };

/** Per-route metadata: title, description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

export const routes = [
  "/",
  "/about-fsp",
  "/programs",
  "/programs/30-days-challenge",
  "/programs/fsp-ttx",
  "/programs/fsp-gtx",
  "/programs/fsp-mastermind",
  "/programs/fsp-wednesday-masterclass",
  "/programs/fsp-habit-circle",
  "/programs/fsp-fun-day",
  "/core-program",
  "/community",
  "/events",
  "/events/catalyst-connect",
  "/gallery",
  "/resources",
  "/faq",
  "/contact",
] as const;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
