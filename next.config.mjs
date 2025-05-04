import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.js"); // or './i18n.js'

const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/en",
      permanent: false,
    },
  ],
  images: {
    domains: ["bza5gc4z0agqern6.public.blob.vercel-storage.com"],
  },
};

// 👇 Wrap and export
export default withNextIntl(nextConfig);
