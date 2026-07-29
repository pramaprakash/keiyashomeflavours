"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Recipe, isFavorite, toggleFavorite } from "@/utils/recipeStore";

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle?: () => void;
  showFavorite?: boolean;
}

export default function RecipeCard({
  recipe,
  onFavoriteToggle,
  showFavorite = true,
}: RecipeCardProps) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (showFavorite) {
      setFav(isFavorite(recipe.id));
    }
  }, [recipe.id, showFavorite]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavStatus = toggleFavorite(recipe.id);
    setFav(newFavStatus);
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-primary-fixed text-on-primary-fixed";
      case "hard":
        return "bg-error-container text-on-error-container";
      case "medium":
      default:
        return "bg-secondary-container text-on-secondary-container";
    }
  };

  return (
    <Link href={`/recipes/${recipe.id}`} className="group block">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:border-primary/30 shadow-[0_4px_20px_rgba(45,75,55,0.04)] hover:shadow-[0_8px_30px_rgba(45,75,55,0.12)] transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
        {/* Image & Overlays */}
        <div className="relative aspect-[4/3] bg-surface-variant overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category Tag */}
          <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-primary font-label-md text-xs uppercase tracking-wider font-bold">
            {recipe.category}
          </span>

          {/* Favorite Button (Optional) */}
          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Add to favorites"
            >
              <span
                className="material-symbols-outlined transition-colors duration-200"
                style={{
                  fontVariationSettings: fav ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400",
                  color: fav ? "var(--color-error)" : "inherit",
                }}
              >
                favorite
              </span>
            </button>
          )}

          {/* Play Video Indicator */}
          {recipe.videoUrl && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/95 text-on-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-primary-container transition-colors duration-200 line-clamp-1">
                {recipe.title}
              </h3>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
