import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const CATEGORY_STYLES: Record<string, string> = {
  NEWS: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  TIPS: "text-green-400 bg-green-400/10 border-green-400/20",
  NUTRITION: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  WORKOUT: "text-red-400 bg-red-400/10 border-red-400/20",
  EVENTS: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  NEWS: "from-blue-900/30 to-cyan-900/30",
  TIPS: "from-green-900/30 to-emerald-900/30",
  NUTRITION: "from-orange-900/30 to-amber-900/30",
  WORKOUT: "from-red-900/30 to-pink-900/30",
  EVENTS: "from-purple-900/30 to-violet-900/30",
};

export const CATEGORY_EMOJI: Record<string, string> = {
  NEWS: "📰",
  TIPS: "💡",
  NUTRITION: "🥗",
  WORKOUT: "💪",
  EVENTS: "🎉",
};

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

interface BlogPostCardProps {
  post: BlogPostData;
  /** featured: large horizontal card. default: vertical grid card */
  variant?: "default" | "featured";
  showFeaturedBadge?: boolean;
  className?: string;
}

const BlogPostCard = ({
  post,
  variant = "default",
  showFeaturedBadge = false,
  className,
}: BlogPostCardProps) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: variant === "featured" ? "numeric" : undefined,
  });

  if (variant === "featured") {
    return (
      <Link
        href={`/news/${post.slug}`}
        className={cn(
          "group relative glass rounded-3xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 flex flex-col lg:flex-row",
          className
        )}
      >
        <div
          className={`lg:w-1/2 h-56 lg:h-auto bg-gradient-to-br ${CATEGORY_GRADIENTS[post.category]} flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-8xl opacity-30 select-none group-hover:scale-110 transition-transform duration-500">
            {CATEGORY_EMOJI[post.category]}
          </span>
          {showFeaturedBadge && (
            <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
              Featured
            </div>
          )}
        </div>

        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[post.category]}`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={11} /> {post.readTime} min read
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              By <strong className="text-foreground">{post.author}</strong>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-semibold group-hover:gap-3 transition-all duration-300">
              Read Article <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${post.slug}`}
      className={cn(
        "group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
        className
      )}
    >
      <div
        className={`h-44 bg-gradient-to-br ${CATEGORY_GRADIENTS[post.category]} flex items-center justify-center relative overflow-hidden`}
      >
        <span className="text-6xl opacity-30 select-none group-hover:scale-110 transition-transform duration-300">
          {CATEGORY_EMOJI[post.category]}
        </span>
        {showFeaturedBadge && post.featured && (
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[post.category]} flex items-center gap-1`}
          >
            <Tag size={9} /> {post.category}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock size={9} /> {post.readTime} min
          </span>
        </div>

        <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border/20 text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
