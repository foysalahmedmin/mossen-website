# MOSSEN — The Botanical Earth

Mirror Try flagship demo store: an organic, quiet-luxury botanical fashion storefront showcasing how the **Mirror Try** virtual try-on plugin adapts to serene, editorial aesthetics.

## Design Archetype
- **Aesthetic:** Soft Minimalism, warm parchment tones, tactile paper deckle edges, and 35mm analog grain.
- **Color Palette:** Misty fog canvas (`#e6e9e0`), deep moss ink (`#20271e`), lichen accent (`#566649`), and peat soil (`#3c2f25`).
- **Typography:** Hedvig Letters Serif (Display), Albert Sans (Editorial text), Spline Sans Mono (Atelier numbers).
- **Navigation:** Centred serif wordmark, unrolling botanical menu sheet, serene top unrolling basket sheet.
- **Signature Motion:** Organic botanical `Vine` SVG growth (`useVineProgress`), gentle image `Bloom` reveals, and tranquil `PageFade` cross-fades.
- **Mirror Try Theme:** **The Window** (`src/integration/mirror-try/theme-mossen.css`), featuring arched natural apertures, parchment textures, and botanical accents.

## Requirements & Environment
- Node.js 24 (`nvm use 24`)
- pnpm 10

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start development server on `http://localhost:3003` |
| `pnpm build` | Production build |
| `pnpm typecheck` | Next.js route typegen & TypeScript compilation check |
| `pnpm test` | Run Vitest suite (42 test suites, 270 unit/contract tests) |
| `pnpm verify` | Typecheck, lint, formatting, and unit tests |
| `pnpm verify:full` | Full verification including Playwright e2e suites |

## Architecture & Fences
- Data and content are accessed strictly through `@/services` (guarded by ESLint import fences and `src/config/fence.test.ts`).
- The Mirror Try plugin lives in `@/plugins/mirror-try` and is decoupled from core store logic via the `@/integration/mirror-try` bridge.
- Compliant with WCAG 2.1 AA accessibility and structured Schema.org (`Product`, `BreadcrumbList`, `Organization`) metadata.
