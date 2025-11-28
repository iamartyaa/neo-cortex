# Deployment & CI/CD Guide

This guide covers deploying NEO.CORTEX to production with automated CI/CD pipelines.

---

## 🚀 Recommended: Vercel

Vercel is the **recommended deployment platform** for Next.js applications. It's created by the same team and offers the best performance and developer experience.

### Why Vercel?

- ✅ Zero configuration for Next.js
- ✅ Automatic HTTPS
- ✅ Global Edge Network (CDN)
- ✅ Preview deployments for every PR
- ✅ Built-in analytics
- ✅ Generous free tier

### Deploy to Vercel

#### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/neo-cortex-blog)

#### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 3: Git Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click Deploy

That's it! Vercel automatically deploys on every push to `main`.

---

## 🔄 CI/CD Pipeline

The repository includes a GitHub Actions workflow for continuous integration.

### Current Workflow

Located at `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
```

### What It Does

| Step | Purpose |
|------|---------|
| Checkout | Clone the repository |
| Setup Node.js | Install Node 20 with npm cache |
| Install dependencies | `npm ci` for reproducible builds |
| Lint | Check code style with ESLint |
| Type check | Verify TypeScript types |
| Build | Ensure production build succeeds |

### Adding Tests (Optional)

```yaml
      - name: Test
        run: npm test
```

---

## 🔐 Environment Variables

### Required for Production

None required for basic deployment!

### Optional

| Variable | Purpose | Where to Set |
|----------|---------|--------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Vercel Dashboard |
| `BUTTONDOWN_API_KEY` | Newsletter | Vercel Dashboard |
| `GISCUS_REPO_ID` | Comments | Vercel Dashboard |

### Setting in Vercel

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add variables for Production/Preview/Development

---

## 📦 Alternative Platforms

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Or use static export:
# Add to next.config.ts: output: 'export'
# Publish directory: out
```

### GitHub Pages (Static Export)

1. Update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/neo-cortex-blog', // if not using custom domain
};
```

2. Add workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: actions/configure-pages@v4
      
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      
      - uses: actions/deploy-pages@v4
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

Add to `next.config.ts`:

```typescript
const nextConfig = {
  output: 'standalone',
};
```

Build and run:

```bash
docker build -t neo-cortex .
docker run -p 3000:3000 neo-cortex
```

---

## 🛡️ Branch Protection

Recommended settings for the `main` branch:

1. Go to GitHub → Settings → Branches
2. Add rule for `main`
3. Enable:
   - ✅ Require pull request reviews (1 reviewer)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

---

## 📊 Monitoring

### Vercel Analytics

Built-in with Vercel deployment. Enable in project settings.

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com) - Free tier available
- [Checkly](https://checklyhq.com) - More advanced

---

## 🔄 Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] `npm run build` succeeds
- [ ] `npm run lint` has no errors
- [ ] Environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error tracking set up

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors

```bash
npx tsc --noEmit
```

### Lint Errors

```bash
npm run lint -- --fix
```

---

## 📞 Support

- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Actions: [docs.github.com/actions](https://docs.github.com/actions)

