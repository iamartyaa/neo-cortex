"use client";

interface VideoProps {
  src: string;
  title?: string;
  caption?: string;
}

export function Video({ src, title, caption }: VideoProps) {
  // Handle YouTube URLs
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(src) : src;

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl bg-black aspect-video">
        {isYouTube ? (
          <iframe
            src={embedUrl}
            title={title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <video
            src={src}
            controls
            className="absolute inset-0 w-full h-full object-contain"
            title={title}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          📹 {caption}
        </figcaption>
      )}
    </figure>
  );
}

