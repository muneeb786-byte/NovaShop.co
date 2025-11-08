// Simulating importing 50 product images from an assets folder
export const productImages: string[] = Array.from(
  { length: 50 },
  (_, i) => `https://picsum.photos/seed/product${i + 1}/400/500`
);

// Simulating importing page-specific images
export const pageImages = {
  hero: 'https://picsum.photos/seed/hero/800/1000',
  casual: 'https://picsum.photos/seed/casual/600/400',
  formal: 'https://picsum.photos/seed/formal/600/400',
  party: 'https://picsum.photos/seed/party/600/400',
  gym: 'https://picsum.photos/seed/gym/600/400',
};
