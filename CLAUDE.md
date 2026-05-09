# RAH Operations — rahoperations.com

## Project Overview
Business services company based in Scottsdale, AZ. Services: website design/SEO, digital marketing, business credit, reputation management, LLC setup, notary, social media management.

## Deployment
- **Live URL**: https://www.rahoperations.com
- **GitHub**: https://github.com/DanielRodriguezRahoperations/Rah.git
- **Deployed via**: Vercel — push to `main` triggers auto-deploy
- **Dev server**: `npm run dev` → http://localhost:5173

## Stack
- React + TypeScript + Vite
- Tailwind CSS (custom config)
- GSAP (scroll animations, video hero)
- Framer Motion (component transitions)
- react-helmet-async (SEO meta tags)

## Brand System
**Colors** (defined in `tailwind.config.js`):
- `luxury-dark` #5a1515 — primary dark brand color
- `luxury-red` #7a1c1c — primary brand red
- `luxury-light` #9d3f3f — lighter brand red
- `luxury-accent` #d14b4b — bright accent
- `cream-50` #faf9f7 — page background
- `cream-100/#f5f3f0`, `cream-200/#ede8e3`, `cream-300/#e5dfd7` — surface tiers
- `slate-dark` #1a1a1a — body text / dark surfaces
- `slate-light` #f8f8f7 — light backgrounds

**Fonts**:
- `font-serif-display` — Playfair Display (hero headings)
- `font-serif-body` — Lora (body serif text)
- `font-sans` — DM Sans (UI / body sans)

## Project Structure
```
src/
├── config/site.ts          ← Canonical brand info: name, URL, phone, email, address, social links
├── pages/                  ← 15+ main pages (HomePage, AboutPage, ServicesPage, ContactPage, etc.)
├── pages/services/         ← 20+ SEO location pages (Scottsdale/Phoenix per service)
├── pages/case-studies/     ← EmpireBuildsAZ, EverAfterEdit, Tier1Customs case studies
├── components/layout/      ← Header, Footer, Layout wrapper
├── components/ui/          ← Reusable UI components (SEOHead, ContactForm, Breadcrumbs, etc.)
├── components/templates/   ← ServiceLocationTemplate (reusable for location pages)
└── utils/url.ts            ← URL helpers
```

## Site Config
All canonical data (phone, email, address, social links, OG image) lives in `src/config/site.ts`. Always import from there — never hardcode contact info.

## Key Commands
```bash
npm run dev      # Start dev server at localhost:5173
npm run build    # Build to dist/
npm run preview  # Preview built dist/ locally
```

## Known Issues
- `dist/` folder was accidentally committed to git. To fix:
  ```bash
  echo "dist/" >> .gitignore
  git rm -r --cached dist/
  git add .gitignore
  git commit -m "Ignore dist folder"
  git push
  ```

## Design Rules
- Never use default Tailwind blue/indigo — always use the luxury red palette
- Do not hardcode phone, email, or address — import from `src/config/site.ts`
- All new service/location pages should use `ServiceLocationTemplate` from `src/components/templates/`
- SEO meta tags go through `SEOHead` component, not raw `<head>` tags
