export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://alishanportfolio.vercel.app/sitemap.xml',
  };
}
