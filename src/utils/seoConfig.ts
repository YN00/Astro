import type { ManifestOptions } from 'vite-plugin-pwa';

export const seoConfig = {
  baseURL: '',
  description: 'Airi Kanna fan comment site',
  type: 'website',
  image: {
    url: '',
    width: 1200,
    height: 630,
  },
  siteName: 'Airi Kanna',
};

export const manifest: Partial<ManifestOptions> = {
  name: 'Airi Kanna',
  short_name: 'kanna',
  description: 'Fan website for Airi Kanna',
  theme_color: '#ff6105',
  background_color: '#ff6105',
  display: 'standalone',
  icons: [],
};
