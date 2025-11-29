import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Quote } from "./Quote";
import { ImageWithCaption } from "./ImageWithCaption";
import { Divider } from "./Divider";
import { Steps, Step } from "./Steps";
import { Video } from "./Video";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./Table";
import Image from "next/image";

// Custom components for MDX
export const mdxComponents = {
  // Override default code blocks
  pre: ({ children, ...props }: any) => {
    // Extract the code element's props
    const codeElement = children?.props;
    if (codeElement) {
      return (
        <CodeBlock
          className={codeElement.className}
          {...props}
        >
          {codeElement.children}
        </CodeBlock>
      );
    }
    return <pre {...props}>{children}</pre>;
  },
  
  // Enhanced headings with IDs for TOC
  h1: ({ children, ...props }: any) => {
    const id = generateId(children);
    return (
      <h1 id={id} className="scroll-mt-24 text-4xl font-black mt-12 mb-6 tracking-tight" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: any) => {
    const id = generateId(children);
    return (
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold mt-10 mb-4 pb-2 border-b-2 border-border flex items-center gap-3 group" {...props}>
        <span className="text-primary">#</span>
        {children}
        <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
          #
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = generateId(children);
    return (
      <h3 id={id} className="scroll-mt-24 text-xl font-bold mt-8 mb-3 flex items-center gap-2 group" {...props}>
        <span className="text-secondary">##</span>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: any) => {
    const id = generateId(children);
    return (
      <h4 id={id} className="scroll-mt-24 text-lg font-bold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  
  // Enhanced paragraphs
  p: ({ children, ...props }: any) => (
    <p className="my-4 leading-relaxed text-foreground/90" {...props}>
      {children}
    </p>
  ),
  
  // Enhanced lists
  ul: ({ children, ...props }: any) => (
    <ul className="my-4 ml-6 space-y-2 list-none" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="my-4 ml-6 space-y-2 list-decimal marker:text-primary marker:font-bold" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-primary" {...props}>
      {children}
    </li>
  ),
  
  // Enhanced blockquote (for simple quotes)
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="my-6 border-l-4 border-primary bg-muted/50 p-4 pl-6 rounded-r-lg italic text-lg" {...props}>
      {children}
    </blockquote>
  ),
  
  // Enhanced inline code
  code: ({ children, className, ...props }: any) => {
    // If it has a className, it's a code block (handled by pre)
    if (className) {
      return <code className={className} {...props}>{children}</code>;
    }
    // Inline code
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-sm text-primary" {...props}>
        {children}
      </code>
    );
  },
  
  // Enhanced links
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-primary font-medium underline decoration-2 decoration-primary/30 underline-offset-2 hover:decoration-primary transition-all"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  
  // Enhanced strong
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-foreground" {...props}>
      {children}
    </strong>
  ),
  
  // Enhanced em
  em: ({ children, ...props }: any) => (
    <em className="italic text-foreground/80" {...props}>
      {children}
    </em>
  ),

  // Strikethrough
  del: ({ children, ...props }: any) => (
    <del className="line-through text-muted-foreground" {...props}>
      {children}
    </del>
  ),
  
  // Horizontal rule
  hr: () => <Divider />,

  // Enhanced images
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="w-full h-auto"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          📷 {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border-4 border-border shadow-neo">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-primary/10 border-b-2 border-border" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="hover:bg-muted/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-xs" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3" {...props}>
      {children}
    </td>
  ),
  
  // Custom components
  Callout,
  Quote,
  ImageWithCaption,
  Divider,
  Steps,
  Step,
  Video,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
};

// Helper to generate IDs from heading text
function generateId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as any).props.children);
  }
  return "";
}
