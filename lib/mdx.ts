import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
  slug: string;
  meta: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: number;
    [key: string]: any;
  };
  content: string;
};

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: {
        ...data,
        readingTime: calculateReadingTime(content),
      } as Post['meta'],
      content,
    };
  });

  return posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: {
      ...data,
      readingTime: calculateReadingTime(content),
    } as Post['meta'],
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.meta.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}

