import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The 30 Days Challenge moved under /programs during the IA restructure.
      { source: "/30-days-challenge", destination: "/programs/30-days-challenge", permanent: true },
      // Catalyst Connect and TTX were anchors on /community; both now have pages.
      { source: "/community/catalyst-connect", destination: "/events/catalyst-connect", permanent: true },
      // The Good to Great certification was removed from the site; send the old
      // URL to the programs index rather than leaving a dead link.
      { source: "/certification", destination: "/programs", permanent: true },
    ];
  },
};

export default nextConfig;
