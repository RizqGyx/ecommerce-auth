"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  onChange: (rating: number) => void;
  size?: number;
}

const StarRatingInput = ({ rating, onChange, size = 22 }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={size}
            className={(hovered ?? rating) >= n ? "text-yellow-400" : "text-muted-foreground/30"}
            fill={(hovered ?? rating) >= n ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
