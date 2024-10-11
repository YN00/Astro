import type { ManifestOptions } from 'vite-plugin-pwa';

export const seoConfig = {
  baseURL: '',
  description: 'Takanashi Kiara fan comment site',
  type: 'website',
  image: {
    url: '',
    width: 1200,
    height: 630,
  },
  siteName: 'Only for Kiara',
};

export const manifest: Partial<ManifestOptions> = {
  name: 'Only for Kiara',
  short_name: 'kiara',
  description: 'Takanashi Kiara fan comment site',
  theme_color: '#ff6105',
  background_color: '#ff6105',
  display: 'standalone',
  icons: [],
};
