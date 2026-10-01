# Fifth Stitch media guide

## Home hero
The Home hero is a 3-slide carousel (2 photos + 1 video: `women-fashion-reel.mp4`). Slides auto-advance every 4.5 seconds and also have manual dots + previous/next controls. Edit `HERO_SLIDES` in `src/pages/Home.jsx` to add or change slides.

## Contact
Hours, phone numbers, address and Instagram link live in one place: `src/data/contact.js`. Set `EMAIL_ADDRESS` there to show an email in the Footer and Contact page (it is hidden while `null`).

## Gallery
7 photos under `public/images/customer-gallery/` plus 5 more from `public/images/`, and 6 video tiles from `public/videos/`.

## Product photos
Each product in `src/data/products.js` points to its own photo. Use clean photos (no Instagram play/mute icons, text overlays or watermarks). Keep `rating` / `reviewCount` in sync with real customer reviews.

## Videos
Large reels were compressed to 720p for faster loading (`boutique-fitting-reel`, `atelier-reel`, `women-fashion-reel`). Replace with originals only if full-HD is needed.
