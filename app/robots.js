export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://karnataka-jobs.vercel.app/sitemap.xml",
  };
}