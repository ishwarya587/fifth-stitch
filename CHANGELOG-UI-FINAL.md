# Fifth Stitch — review fixes

- Collection slider: card widths now match the real gap (no cut-off third card), auto-slide loops back to the start, arrows hide when nothing scrolls, respects reduced-motion. 1–3 pieces show as a plain grid.
- Collections: category chips only show categories that exist for the selected gender (no empty "Men → Western Wear"). Placeholder "photo coming soon" removed from the hero.
- Navbar: full link row from 1024px up, menu button below it (no overflow at tablet width); single notification bell.
- Product photos/names matched: Heritage Brown, Regent Three-Piece, Oxford Blue (velvet), Monarch Plum Three-Piece, Celeste Sage Tailored Set, Windsor description. Watermarks/overlays cropped or removed where possible.
- Product page: enquiry form now confirms; size/state resets when switching products; Esc closes lightboxes and search; page scrolls to top on navigation.
- Footer/Contact: shared `src/data/contact.js`, "Add email address" text removed, Instagram link cleaned.
- Gallery now has the 7 supplied photos and 6 videos (even grid). Home media labels match product names.
- Removed unused components and duplicate/unused images; compressed 3 large videos.

Run `npm install` before `npm run dev` (dependencies are not included).
