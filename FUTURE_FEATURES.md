# Future Features & Roadmap

This document outlines planned enhancements and features for NEO.CORTEX.

---

## 🎯 Planned Features

### Comments System (Giscus)

**Status:** Ready to implement  
**Priority:** High

Giscus uses GitHub Discussions for comments, keeping everything in one place.

**To enable:**

1. Go to [giscus.app](https://giscus.app)
2. Enter your repository details
3. Copy the configuration values
4. Update `components/GiscusComments.tsx`:

```tsx
<Giscus
  repo="iamartyaa/neo-cortex"
  repoId="YOUR_REPO_ID"
  category="Comments"
  categoryId="YOUR_CATEGORY_ID"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="preferred_color_scheme"
  lang="en"
/>
```

5. Uncomment the GiscusComments import in `app/blog/[slug]/page.tsx`

---

### Newsletter Integration

**Status:** UI complete, backend needed  
**Priority:** High

The newsletter form is ready with confetti celebration. Connect to a provider:

**Recommended Providers:**

| Provider | Pros | Setup |
|----------|------|-------|
| **Buttondown** | Simple, free tier | API key only |
| **ConvertKit** | Great for creators | API + forms |
| **Resend** | Developer-focused | React SDK |
| **Mailchimp** | Full-featured | API + audience ID |

**Implementation:**

```typescript
// In NewsletterForm.tsx, replace the simulate call:
const response = await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email }),
});
```

Create `app/api/subscribe/route.ts`:

```typescript
export async function POST(req: Request) {
  const { email } = await req.json();
  
  // Example: Buttondown
  await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  
  return Response.json({ success: true });
}
```

---

### Cursor Trail Effect

**Status:** Component ready  
**Priority:** Low (visual polish)

A fun cursor trail effect is available but disabled by default.

**To enable:**

1. Open `app/layout.tsx`
2. Import and add the component:

```tsx
import { CursorTrail } from "@/components/CursorTrail";

// In the return, add:
<CursorTrail />
```

**Note:** May impact performance on lower-end devices. Consider adding a toggle in settings.

---

### View Counter

**Status:** Not started  
**Priority:** Medium

Track post views using a database or analytics service.

**Options:**

1. **Vercel Analytics** - Built-in, easy setup
2. **Upstash Redis** - Serverless, fast
3. **PlanetScale** - MySQL, scalable

**Example with Upstash:**

```typescript
// lib/views.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function incrementViews(slug: string) {
  return await redis.incr(`views:${slug}`);
}

export async function getViews(slug: string) {
  return await redis.get<number>(`views:${slug}`) ?? 0;
}
```

---

### Reading History

**Status:** Not started  
**Priority:** Low

Store reading history in localStorage for "Continue Reading" feature.

```typescript
// lib/readingHistory.ts
export function addToHistory(slug: string, title: string) {
  const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
  const filtered = history.filter((h: any) => h.slug !== slug);
  filtered.unshift({ slug, title, date: new Date().toISOString() });
  localStorage.setItem('readingHistory', JSON.stringify(filtered.slice(0, 10)));
}
```

---

### RSS Feed

**Status:** Not started  
**Priority:** Medium

Generate RSS feed for subscribers.

```typescript
// app/feed.xml/route.ts
import { getPosts } from '@/lib/mdx';

export async function GET() {
  const posts = getPosts();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NEO.CORTEX</title>
    <link>https://your-domain.com</link>
    <description>AI & Software Engineering Blog</description>
    ${posts.map(post => `
    <item>
      <title>${post.meta.title}</title>
      <link>https://your-domain.com/blog/${post.slug}</link>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <description>${post.meta.excerpt}</description>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

---

### Search Enhancement

**Status:** Basic search complete  
**Priority:** Medium

Current search is client-side. For larger blogs, consider:

1. **Algolia** - Instant search, free tier
2. **Typesense** - Open source, self-hosted
3. **Fuse.js** - Client-side fuzzy search (already possible)

---

### Estimated Reading Progress

**Status:** Complete  
**Priority:** Done ✅

Already implemented with gradient progress bar.

---

### Social Preview Images (OG Images)

**Status:** Not started  
**Priority:** Medium

Auto-generate social preview images for posts.

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div style={{ /* styles */ }}>
        <h1>{title}</h1>
        <p>NEO.CORTEX</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

---

## 🗓️ Roadmap

### Phase 1 (Current)
- ✅ Core blog functionality
- ✅ Neo-brutalist design
- ✅ MDX support
- ✅ Command palette search
- ✅ Dark/light mode

### Phase 2 (Next)
- [ ] Giscus comments
- [ ] Newsletter integration
- [ ] RSS feed
- [ ] View counter

### Phase 3 (Future)
- [ ] OG image generation
- [ ] Full-text search
- [ ] Reading history
- [ ] Author profiles

---

## 💡 Feature Requests

Have an idea? Open an issue on GitHub with the `enhancement` label!

