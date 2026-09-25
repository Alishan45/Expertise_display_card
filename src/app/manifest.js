export default function manifest() {
  return {
    name: 'Ali Shan Portfolio',
    short_name: 'Ali Shan',
    description: 'AI & Machine Learning Engineer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0c',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/icon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
