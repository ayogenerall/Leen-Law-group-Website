import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Services that have a dedicated page redirect there from /services/[slug].
  async redirects() {
    return [
      { source: "/services/consumer-administrative-support", destination: "/consumer-support", permanent: true },
      { source: "/services/business-startup-administration", destination: "/business-startup", permanent: true },
      { source: "/services/notary-services", destination: "/notary", permanent: true },
      { source: "/services/authorized-representative-support", destination: "/services/attorney-in-fact", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
