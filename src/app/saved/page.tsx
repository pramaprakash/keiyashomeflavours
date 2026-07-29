"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getRecipes, getFavorites, Recipe } from "@/utils/recipeStore";

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const loadSavedRecipes = () => {
    const allRecipes = getRecipes();
    const favIds = getFavorites();
    const favs = allRecipes.filter((r) => favIds.includes(r.id));
    setSavedRecipes(favs);
  };

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const handleFavoriteToggle = () => {
    loadSavedRecipes();
  };

  const cookingQuotes = [
    {
      text: "Cooking is like love. It should be entered into with abandon or not at all.",
      author: "Harriet Van Horne"
    },
    {
      text: "The secret of good cooking is, first, having a love of it.",
      author: "James Beard"
    },
    {
      text: "Traditional cooking is not about copying the past, but about passing down the warmth.",
      author: "Chef Keiya"
    }
  ];

  return (
    <>
      <Navbar showSearch={false} />

      <main className="pt-24 pb-32 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest mb-3 font-bold">
            Curated Collection
          </span>
          <h2 className="font-headline-xl text-3xl md:text-5xl font-black text-primary mb-2">
            Your Culinary Collection
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Your personally bookmarked recipes, flavor guides, and masterclass videos.
          </p>
        </div>

        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onFavoriteToggle={handleFavoriteToggle} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-8">
            {/* Empty State Card */}
            <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/20 flex flex-col justify-center items-center">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 opacity-50">
                bookmark_border
              </span>
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold">No saved recipes yet</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8 max-w-sm">
                Explore our Discover feed, watch cooking videos, and bookmark your favorite heritage creations to save them here.
              </p>
              <Link
                href="/"
                className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow hover:opacity-90 active:scale-95 transition-all inline-block"
              >
                Explore Recipes
              </Link>
            </div>

            {/* Inspirational Quote Card */}
            <div className="md:col-span-5 bg-primary p-8 rounded-2xl text-on-primary shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[120px]">format_quote</span>
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-primary-container text-primary-fixed-dim font-label-md text-[10px] uppercase tracking-wider mb-6 font-bold">
                  Kitchen Wisdom
                </span>
                <p className="font-headline-sm text-lg md:text-xl text-white italic leading-relaxed mb-6 font-medium">
                  &quot;{cookingQuotes[0].text}&quot;
                </p>
              </div>
              <p className="text-xs font-bold text-primary-fixed-dim uppercase tracking-wider relative z-10">
                — {cookingQuotes[0].author}
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
