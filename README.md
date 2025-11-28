# NEO.CORTEX 🧠

> **Decoding the singularity with raw code and bold design.**

NEO.CORTEX is an open-source tech blog built with Next.js 16, featuring a stunning neo-brutalist design. Write about AI, software engineering, and the future of technology.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iamartyaa/neo-cortex.git
cd neo-cortex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
neo-cortex-blog/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   └── contribute/        # Contribution page
├── components/            # React components
│   ├── mdx/              # MDX rendering components
│   └── ui/               # UI components (NeoButton, NeoCard, etc.)
├── content/
│   └── posts/            # MDX blog posts
├── lib/                  # Utility functions
└── public/               # Static assets
```

---

## ✍️ Writing Posts

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-01"
excerpt: "A brief description"
tags: ["ai", "webdev"]
---

Your content here using Markdown...

## Headings, **bold**, *italic*, `code`

- Lists work too
- Like this

```javascript
// Code blocks with syntax highlighting
const hello = "world";
```

<Callout type="info">
  Custom components like callouts!
</Callout>

<Video src="https://youtube.com/watch?v=..." caption="YouTube embeds" />
```

### Supported MDX Components

| Component | Usage |
|-----------|-------|
| `<Callout>` | Info/warning/tip boxes |
| `<Video>` | YouTube embeds |
| `<Quote>` | Styled blockquotes |
| `<Steps>` | Step-by-step guides |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to contribute an article:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/neo-cortex.git
cd neo-cortex
git checkout -b post/your-article-title
```

### 2. Write Your Post

- Create `content/posts/your-slug.mdx`
- Use the contribute page at `/contribute` to preview your post
- Follow the MDX formatting guide

### 3. Submit a Pull Request

```bash
git add content/posts/your-slug.mdx
git commit -m "Add post: Your Post Title"
git push origin post/your-article-title
```

Then open a PR on GitHub!

### Contribution Guidelines

- ✅ Articles about AI, software engineering, or related tech topics
- ✅ Original content only
- ✅ Minimum 500 words
- ✅ Include code examples where relevant
- ✅ Proper grammar and formatting
- ✅ Be respectful and inclusive

---

## 📚 Documentation

- **[FUTURE_FEATURES.md](./FUTURE_FEATURES.md)** - Planned enhancements and roadmap
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - CI/CD and deployment guide

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework |
| Tailwind CSS 4 | Styling |
| MDX | Blog content |
| TypeScript | Type safety |
| Lucide | Icons |

---

## 📄 License

MIT License - feel free to use this for your own blog!

---

<p align="center">
  <strong>Built with 🧠 by the NEO.CORTEX community</strong>
</p>
