# NEO.CORTEX Tech Stack

> A comprehensive overview of the technologies powering this neo-brutalist AI blog platform.

---

## 🏗️ Core Framework

### Next.js 16 (App Router)
**Why we chose it:**
- **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Perfect for a blog where SEO is critical. Blog posts are pre-rendered at build time for instant loading and optimal search engine indexing.
- **App Router Architecture**: The new `app/` directory structure provides intuitive file-based routing with built-in layouts, loading states, and error handling.
- **React Server Components**: Reduces client-side JavaScript bundle size by rendering components on the server where possible.
- **Built-in SEO APIs**: Native support for `generateMetadata`, `sitemap.ts`, and `robots.ts` makes SEO optimization straightforward.
- **Image Optimization**: Automatic image optimization with the `next/image` component for better Core Web Vitals.
- **Zero Config**: Works out of the box with TypeScript, CSS, and modern JavaScript features.

**Best for our use case because:**
A blog needs excellent SEO, fast initial page loads, and the ability to scale content easily. Next.js delivers all of this while providing a great developer experience.

---

## ⚛️ UI Framework

### React 19
**Why we chose it:**
- **Latest Features**: React 19 brings improved performance, better concurrent rendering, and enhanced developer experience.
- **Component-Based Architecture**: Perfect for building reusable UI components like cards, buttons, and animation wrappers.
- **Ecosystem**: Massive ecosystem of libraries, tools, and community support.
- **Hooks API**: Clean state management and side effects handling with `useState`, `useEffect`, `useRef`, etc.

**Best for our use case because:**
React's component model aligns perfectly with our design system approach—each neo-brutalist UI element is a self-contained, reusable component.

---

## 🎨 Styling

### Tailwind CSS v4
**Why we chose it:**
- **Utility-First**: Rapid prototyping and consistent styling without leaving your JSX.
- **CSS Variables**: Native CSS variable support in v4 enables our dynamic theming (light/dark modes).
- **Just-In-Time (JIT)**: Only generates the CSS you actually use, resulting in tiny bundle sizes.
- **Typography Plugin**: `@tailwindcss/typography` provides beautiful prose styling for our MDX blog content.
- **No Context Switching**: Style directly in components without jumping between files.
- **Responsive Design**: Built-in responsive utilities (`sm:`, `md:`, `lg:`) make mobile-first design effortless.

**Best for our use case because:**
Neo-brutalism requires bold, consistent styling with sharp borders, shadows, and vibrant colors. Tailwind's utility classes and custom CSS variables let us implement this aesthetic system-wide with perfect consistency.

### Custom CSS Variables
We use CSS custom properties for our design tokens:
```css
--primary: #FF6B9D;      /* Hot pink - primary actions */
--secondary: #00D4AA;    /* Mint green - secondary elements */
--accent: #A855F7;       /* Purple - accents */
--warning: #FBBF24;      /* Yellow - warnings/highlights */
```

---

## 📝 Content Management

### MDX (via next-mdx-remote)
**Why we chose it:**
- **Markdown + JSX**: Write content in familiar Markdown while embedding React components for rich interactivity.
- **Custom Components**: Map custom components like `<Callout>`, `<Quote>`, `<ImageWithCaption>`, `<Video>`, and `<Steps>` to enhance content.
- **Syntax Highlighting**: Integrates with Shiki for beautiful code blocks.
- **No CMS Lock-in**: Content lives in `.mdx` files in the repository—version controlled and portable.
- **Dynamic Rendering**: `next-mdx-remote` enables server-side rendering of MDX content.

**Best for our use case because:**
A tech blog needs rich content with code snippets, callouts, embedded media, and custom formatting. MDX gives us the power of React components within Markdown's simplicity.

### gray-matter
**Why we chose it:**
- **Frontmatter Parsing**: Extracts YAML metadata (title, date, tags, author) from MDX files.
- **Simple API**: Just pass file content, get back structured data and content.
- **Industry Standard**: Used by countless static site generators.

### remark-gfm
**Why we chose it:**
- **GitHub Flavored Markdown**: Adds support for tables, strikethrough, autolinks, and task lists.
- **Familiar Syntax**: Most developers know GFM from GitHub READMEs.

### rehype-pretty-code + Shiki
**Why we chose it:**
- **Syntax Highlighting**: Beautiful, VS Code-quality code highlighting with theme support.
- **Server-Side**: Highlighting happens at build time, not in the browser.
- **Language Support**: Supports 100+ programming languages out of the box.
- **Line Highlighting**: Supports line numbers, line highlighting, and word highlighting.

---

## ✨ Animations

### Anime.js v4
**Why we chose it:**
- **Lightweight**: ~17KB minified, much smaller than alternatives like GSAP.
- **Powerful Staggering**: Advanced stagger functions for grid-based animations and sequential reveals.
- **Timeline API**: Orchestrate complex multi-step animations with precise control.
- **CSS Properties**: Animate any CSS property including transforms, colors, and custom properties.
- **SVG Support**: Native SVG animation including path drawing and morphing.
- **Spring Physics**: Natural-feeling animations with spring-based easing.

**Used for:**
- Hero title letter-by-letter reveal
- Staggered grid animations for post cards
- Counter number animations
- Logo hover effects with wave animation
- Footer element animations

**Best for our use case because:**
Neo-brutalism calls for bold, intentional motion. Anime.js gives us fine-grained control over timing and sequencing while keeping bundle size reasonable.

### canvas-confetti
**Why we chose it:**
- **Celebration Moments**: Adds delightful confetti effects for user actions (newsletter signup).
- **Performant**: Canvas-based rendering is GPU-accelerated.
- **Customizable**: Control colors, shapes, spread, and physics.

---

## 🎯 UI Components & Utilities

### Lucide React
**Why we chose it:**
- **Beautiful Icons**: Clean, consistent icon set with 1000+ icons.
- **Tree-Shakeable**: Only imports the icons you use.
- **React Components**: Each icon is a proper React component with full prop support.
- **Customizable**: Easy to adjust size, color, and stroke width.

### cmdk (Command Menu)
**Why we chose it:**
- **Keyboard-First Search**: Provides the `⌘K` command palette for quick post navigation.
- **Accessible**: Built with accessibility in mind (ARIA, focus management).
- **Composable**: Low-level primitives let us build custom UI.
- **Fast Filtering**: Client-side fuzzy search with excellent performance.

**Best for our use case because:**
Power users expect keyboard shortcuts. A command palette makes navigating blog posts instant and delightful.

### next-themes
**Why we chose it:**
- **Dark Mode**: Seamless light/dark theme switching with system preference detection.
- **No Flash**: Prevents the flash of wrong theme on page load with proper SSR handling.
- **Simple API**: `useTheme()` hook makes theme access trivial.

### clsx + tailwind-merge
**Why we chose it:**
- **Conditional Classes**: `clsx` enables clean conditional class composition.
- **Merge Conflicts**: `tailwind-merge` intelligently resolves Tailwind class conflicts (e.g., `p-4` vs `p-2`).
- **Bundle Size**: Both are tiny and tree-shakeable.

### date-fns
**Why we chose it:**
- **Date Formatting**: Clean, functional API for date manipulation.
- **Tree-Shakeable**: Only imports functions you use, unlike moment.js.
- **Immutable**: All functions return new dates, preventing mutation bugs.

---

## 🔧 Development Tools

### TypeScript 5
**Why we chose it:**
- **Type Safety**: Catches errors at compile time, not runtime.
- **Better DX**: Autocomplete, refactoring, and inline documentation.
- **Self-Documenting**: Types serve as documentation for component props and function signatures.
- **Industry Standard**: Expected in modern React/Next.js projects.

**Best for our use case because:**
A growing codebase with multiple components needs type safety. TypeScript ensures our MDX components receive correct props and our utilities work correctly.

### ESLint 9
**Why we chose it:**
- **Code Quality**: Enforces consistent code style and catches common mistakes.
- **Next.js Rules**: `eslint-config-next` includes Next.js-specific best practices.
- **Flat Config**: ESLint 9's new flat config is simpler and more performant.

---

## 📊 SEO & Performance

### Built-in Next.js SEO
- **Metadata API**: `generateMetadata` function for dynamic meta tags
- **Open Graph**: Full OG support for social media previews
- **Twitter Cards**: Rich media cards for X/Twitter sharing
- **Sitemap**: Auto-generated `sitemap.xml` from `app/sitemap.ts`
- **Robots**: Crawl rules via `app/robots.ts`
- **Canonical URLs**: Proper canonical link handling

### Performance Optimizations
- **Static Generation**: Blog posts are pre-rendered at build time
- **Image Optimization**: Next.js automatic image resizing and WebP conversion
- **Code Splitting**: Automatic per-page JavaScript bundles
- **Font Optimization**: `next/font` for zero-layout-shift font loading

---

## 📁 Project Structure

```
neo-brutalist-blog/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and post pages
│   ├── contribute/        # Contribution guide page
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── robots.ts          # Robots.txt generation
├── components/
│   ├── animations/        # Anime.js powered components
│   ├── mdx/               # Custom MDX components
│   └── ui/                # Reusable UI primitives
├── content/
│   └── posts/             # MDX blog posts
├── lib/
│   ├── mdx.ts             # MDX processing utilities
│   ├── utils.ts           # General utilities (cn, etc.)
│   └── animations.ts      # Anime.js exports
└── public/
    └── images/            # Static images
```

---

## 🎨 Design System: Neo-Brutalism

Our design system is built on neo-brutalist principles:

| Element | Implementation |
|---------|----------------|
| **Bold Borders** | 2-4px solid borders with `border-border` class |
| **Hard Shadows** | Custom `shadow-neo` utilities with offset solid shadows |
| **Vibrant Colors** | High-contrast palette with pink, mint, purple, yellow |
| **Geometric Shapes** | Sharp corners with intentional `rounded-lg` softening |
| **Typography** | Space Grotesk (headings) + JetBrains Mono (code) |
| **Motion** | Intentional, snappy animations with Anime.js |
| **Noise Texture** | Subtle CSS noise pattern overlay for tactility |

---

## 📦 Dependency Summary

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **Framework** | next | 16.0.5 | React framework with SSR/SSG |
| **UI** | react | 19.2.0 | Component library |
| **Styling** | tailwindcss | 4.x | Utility-first CSS |
| **Content** | next-mdx-remote | 5.0.0 | MDX rendering |
| **Content** | gray-matter | 4.0.3 | Frontmatter parsing |
| **Content** | rehype-pretty-code | 0.14.1 | Code syntax highlighting |
| **Content** | shiki | 3.17.0 | Syntax highlighter |
| **Animation** | animejs | 4.2.2 | JavaScript animations |
| **Animation** | canvas-confetti | 1.9.4 | Confetti effects |
| **Icons** | lucide-react | 0.555.0 | Icon library |
| **UI** | cmdk | 1.1.1 | Command palette |
| **Theming** | next-themes | 0.4.6 | Dark mode support |
| **Utils** | clsx | 2.1.1 | Class composition |
| **Utils** | tailwind-merge | 3.4.0 | Class merging |
| **Utils** | date-fns | 4.1.0 | Date formatting |
| **Types** | typescript | 5.x | Static typing |

---

## 🚀 Why This Stack?

This stack was chosen to achieve:

1. **Performance**: Static generation + optimized images = blazing fast load times
2. **SEO**: Server rendering + proper metadata = excellent search visibility  
3. **Developer Experience**: TypeScript + Tailwind + hot reload = rapid iteration
4. **Content Flexibility**: MDX + custom components = rich, interactive articles
5. **Visual Impact**: Anime.js + CSS animations = memorable user experience
6. **Maintainability**: Component architecture + type safety = scalable codebase
7. **Modern Standards**: Latest React 19 + Next.js 16 = future-proof foundation

---

*This document is a living reference. Update it as the tech stack evolves.*

