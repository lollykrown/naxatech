# Naxatech Website — Next.js + Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Requirements
- Node.js 18+
- npm 9+

## Project Structure
```
naxatech/
├── app/
│   ├── globals.css        # Global styles + Tailwind imports
│   ├── layout.js          # Root layout with Syne + Outfit fonts
│   └── page.js            # Main page (assembles all sections)
├── components/
│   ├── Navbar.js          # Sticky nav with mobile menu
│   ├── Hero.js            # Hero with animated word rotation + dashboard visual
│   ├── Services.js        # 8-service grid with hover effects
│   ├── About.js           # About + animated counters + testimonial snippet
│   ├── Process.js         # 6-step process grid
│   ├── Testimonials.js    # Rotating testimonial carousel
│   ├── CTA.js             # Call-to-action banner
│   ├── Contact.js         # Contact form + info
│   └── Footer.js          # Footer with links
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Design Notes
- **Color palette**: Deep navy (`#080C18`) + Electric acid green (`#C8FF3E`)
- **Fonts**: Syne (display/headings) + Outfit (body)
- **Key features**: Animated word rotation in hero, scroll-triggered counters,
  service card hover animations, testimonial carousel, working contact form UI
