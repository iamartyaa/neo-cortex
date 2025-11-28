import Image from "next/image";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border-2 border-border shadow-neo-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

