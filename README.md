This is a Next.js (App Router) marketing site for an AI lead discovery / scraping product.

It's inspired by the _structure and UX logic_ of tenji.ai (not the design or code). The visual identity, copywriting, and components are original.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Localized routes

This project uses locale-prefixed routes with `next-intl`:

- `/fr` (default)
- `/en`
- `/de`
- `/it`

Main pages:

- `/$locale` (Home)
- `/$locale/features`
- `/$locale/pricing`
- `/$locale/integrations`
- `/$locale/demo`
- `/$locale/contact`
- `/$locale/legal/privacy`
- `/$locale/legal/terms`

Language routing is handled by `src/proxy.ts` (Next.js proxy convention).

You can start editing the pages under `src/app/[locale]/*`.

Animations are done with Framer Motion.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
