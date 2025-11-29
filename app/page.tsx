import Link from "next/link";
import { getPosts } from "@/lib/mdx";
import { PostCard } from "@/components/PostCard";
import { NeoCard } from "@/components/ui/NeoCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Code2, Brain, Terminal, GitPullRequest } from "lucide-react";
import { GridPattern, BrutalistStar, BrutalistArrow, BrutalistGridDots } from "@/components/ui/Backgrounds";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroTitle } from "@/components/animations/HeroTitle";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedLine } from "@/components/animations/AnimatedLine";

export default function Home() {
  const posts = getPosts().slice(0, 6);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <GridPattern />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] w-24 h-24 text-primary opacity-20 animate-pulse hidden md:block">
        <BrutalistStar className="w-full h-full" />
      </div>
      <div className="absolute bottom-40 left-[5%] w-32 h-32 text-secondary opacity-20 rotate-12 hidden md:block">
        <BrutalistStar className="w-full h-full" />
      </div>

      {/* Marquee Banner */}
      <div className="bg-foreground text-background py-3 overflow-hidden border-b-4 border-border relative z-20">
        <div className="animate-marquee whitespace-nowrap flex font-mono uppercase tracking-widest text-sm font-bold">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center gap-8">
              <span className="flex items-center gap-2"><Terminal className="h-4 w-4" /> SYSTEM.READY</span>
              <span className="mx-2">{"//"}</span>
              <span className="flex items-center gap-2"><Code2 className="h-4 w-4" /> DEPLOY_CODE</span>
              <span className="mx-2">{"//"}</span>
              <span className="flex items-center gap-2"><Brain className="h-4 w-4" /> NEURAL_LINK_ESTABLISHED</span>
              <span className="mx-2">{"//"}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-b-4 border-border overflow-hidden">
        <BrutalistGridDots className="opacity-10" />
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-primary/5 to-transparent skew-x-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-t from-secondary/5 to-transparent -skew-x-12 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <ScrollReveal>
            <div className="inline-block transform hover:scale-105 transition-transform duration-300">
              <span className="bg-warning text-warning-foreground px-8 py-3 text-sm font-black uppercase border-4 border-border shadow-neo rounded-none font-mono tracking-widest">
                ⚠️ INITIATING_SEQUENCE...
              </span>
            </div>
          </ScrollReveal>
          
          {/* Animated Hero Title */}
          <HeroTitle className="relative" />

          <div className="space-y-4">
            <ScrollReveal delay={1400}>
              <p className="text-2xl md:text-3xl font-bold text-muted-foreground max-w-3xl mx-auto leading-tight">
                DECODING THE <span className="text-primary bg-primary/10 px-2">SINGULARITY</span> WITH
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1800}>
              <p className="text-2xl md:text-3xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                <span className="text-secondary bg-secondary/10 px-2">RAW CODE</span> AND <span className="text-primary bg-primary/10 px-2">BOLD DESIGN</span>.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/blog">
                <MagneticButton 
                  strength={0.2}
                  className="h-16 px-12 text-xl font-black uppercase tracking-wider bg-primary text-primary-foreground border-4 border-border shadow-neo-lg hover:shadow-neo-xl transition-all"
                >
                  EXECUTE_READ()
                </MagneticButton>
              </Link>
              <Link href="/contribute">
                <MagneticButton 
                  strength={0.2}
                  className="h-16 px-12 text-xl font-black uppercase tracking-wider bg-secondary text-secondary-foreground border-4 border-border shadow-neo-lg hover:shadow-neo-xl transition-all flex items-center"
                >
                  <GitPullRequest className="h-6 w-6 mr-3" />
                  CONTRIBUTE()
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-4 border-border pb-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest border border-primary px-2 py-1">
                  Directory: /posts/latest
                </span>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
                  FRESH_DROPS.LOG
                </h2>
                {/* Animated underline */}
                <AnimatedLine 
                  variant="underline" 
                  width={200} 
                  height={10} 
                  strokeWidth={4}
                  strokeColor="var(--primary)"
                  delay={300}
                />
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 group">
                <span className="font-bold font-mono uppercase tracking-wider group-hover:underline decoration-4 decoration-primary underline-offset-4">
                  VIEW_ALL_DATA
                </span>
                <BrutalistArrow className="w-8 h-8 rotate-[-45deg] group-hover:rotate-0 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Staggered Post Cards Grid */}
          <StaggerGrid
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            staggerDelay={100}
            animation="fadeUp"
            from="first"
            columns={3}
            useGrid={true}
          >
            {posts.map((post) => (
              <div key={post.slug} className="transform hover:-rotate-1 transition-transform duration-300">
                <PostCard post={post} />
              </div>
            ))}
          </StaggerGrid>

          <div className="md:hidden text-center">
            <Link href="/blog">
              <MagneticButton className="w-full max-w-sm border-4 font-bold font-mono bg-card text-foreground border-border shadow-neo py-3">
                VIEW_ALL_DATA
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Quote Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y-4 border-border bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <GridPattern />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center space-y-8">
              {/* Quote Mark */}
              <div className="text-8xl md:text-9xl font-black text-primary/30 leading-none select-none">
                &ldquo;
              </div>
              
              {/* Quote Text */}
              <blockquote className="text-2xl md:text-4xl font-bold leading-relaxed tracking-tight -mt-16">
                The development of full artificial intelligence could spell the end of the human race... or it could be the best thing ever to happen to humanity. We just don&apos;t know.
              </blockquote>
              
              {/* Author */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <div className="h-1 w-16 bg-primary" />
                <div className="flex items-center gap-3">
                  <span className="text-lg md:text-xl font-black text-primary">Stephen Hawking</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm font-mono text-muted-foreground">Theoretical Physicist</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-10 left-10 text-accent opacity-20 animate-spin-slow hidden lg:block">
          <BrutalistStar className="w-48 h-48" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <NeoCard className="p-10 md:p-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-center space-y-8 border-4 shadow-neo-xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-foreground transform rotate-45 translate-x-10 -translate-y-10" />
              
              <div className="inline-block bg-accent text-accent-foreground px-6 py-2 text-sm font-bold font-mono uppercase tracking-widest border-2 border-border shadow-neo transform -rotate-2">
                📬 SUBSCRIBE.TO_STREAM
              </div>
              
              <AnimatedText
                text="DATA_INGESTION"
                as="h2"
                className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                splitBy="letter"
                animation="scaleUp"
                staggerDelay={40}
              />
              
              <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium">
                Get the latest tech payloads delivered straight to your inbox.
                <span className="block mt-2 font-bold text-foreground bg-warning/20 inline-block px-2">
                  0% SPAM / 100% SIGNAL
                </span>
              </p>
              
              <NewsletterForm />
            </NeoCard>
          </ScrollReveal>
        </div>
      </section>
      
    </main>
  );
}
