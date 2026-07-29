"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import VideoPlayer from "@/components/VideoPlayer";
import { getRecipes, Recipe } from "@/utils/recipeStore";

export default function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const urlSearch = resolvedSearchParams.search || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [isHeroVideoOpen, setIsHeroVideoOpen] = useState(false);

  // Sync url search to state
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  // Sync state changes back to browser URL history without reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (searchQuery.trim()) {
        url.searchParams.set("search", searchQuery);
      } else {
        url.searchParams.delete("search");
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchQuery]);

  // Load recipes from store
  useEffect(() => {
    const allRecipes = getRecipes();
    setRecipes(allRecipes);

    // Set Beetroot Pachadi as the default featured signature recipe
    const featured = allRecipes.find((r) => r.id === "beetroot-pachadi") || allRecipes[0];
    setFeaturedRecipe(featured || null);
  }, []);

  // Filter recipes based on search query and selected category
  useEffect(() => {
    let result = recipes;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (recipe) => recipe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(q) ||
          recipe.description.toLowerCase().includes(q) ||
          recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
      );
    }

    setFilteredRecipes(result);
  }, [recipes, searchQuery, selectedCategory]);

  const categories = [
    { id: "all", name: "All Recipes", icon: "restaurant" },
    { id: "signature", name: "Signature", icon: "workspace_premium" },
    { id: "breakfast", name: "Breakfast", icon: "sunny" },
    { id: "lunch", name: "Lunch", icon: "lunch_dining" },
    { id: "dinner", name: "Dinner", icon: "dinner_dining" },
    { id: "dessert", name: "Desserts", icon: "cookie" },
  ];

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="pt-24 pb-20">
        {/* Featured Recipe Hero Banner */}
        {featuredRecipe && (
          <>
            <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
              {/* Background Image with Parallax & Hover Shift */}
              <div className="absolute inset-0 z-0">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-103"
                  style={{ backgroundImage: `url('${featuredRecipe.imageUrl}')` }}
                ></div>
                {/* Soft Gradient Overlay for Premium Look */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/10 to-background"></div>
              </div>

              {/* Content & Action Panel */}
              <div className="relative z-10 h-full flex flex-col md:flex-row items-end md:items-center justify-between px-margin-mobile md:px-margin-desktop pb-12 md:pb-0 max-w-7xl mx-auto w-full gap-8">
                {/* Typography overlay (left aligned) */}
                <div className="max-w-2xl text-left select-none mt-20 md:mt-0">
                  <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest mb-4 font-bold shadow-sm">
                    Signature Heritage Dish
                  </span>
                  <h2 className="font-headline-xl text-5xl md:text-[80px] md:leading-[88px] text-primary font-black mix-blend-multiply md:mix-blend-normal tracking-tighter">
                    {featuredRecipe.title}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-xl hidden md:block leading-relaxed">
                    {featuredRecipe.description}
                  </p>

                  {/* Quick Info Badges in line */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/90 backdrop-blur-sm border border-outline-variant/30 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {featuredRecipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/90 backdrop-blur-sm border border-outline-variant/30 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {featuredRecipe.serves} Serves
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/90 backdrop-blur-sm border border-outline-variant/30 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      {featuredRecipe.calories}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/90 backdrop-blur-sm border border-outline-variant/30 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-sm">grade</span>
                      {featuredRecipe.difficulty}
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Masterclass Card (right aligned) */}
                <div
                  onClick={() => setIsHeroVideoOpen(true)}
                  className="bg-surface/85 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/40 shadow-xl max-w-sm w-full cursor-pointer hover:scale-102 hover:border-primary/40 hover:bg-surface/95 transition-all duration-300 group flex items-center gap-5"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline-variant/30">
                    <img src={featuredRecipe.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl font-black group-hover:scale-110 transition-transform duration-300">
                        play_arrow
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="inline-block text-[9.5px] font-black uppercase text-outline bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded tracking-wider mb-1.5 animate-pulse">
                      Watch Video
                    </span>
                    <h4 className="text-sm font-bold text-primary line-clamp-1 leading-snug group-hover:text-primary-container transition-colors">
                      Chef Keiya&apos;s Masterclass
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Click to play cooking class instructions
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cinema Video Modal Overlay */}
            {isHeroVideoOpen && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in">
                <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/25">
                  <VideoPlayer
                    videoUrl={featuredRecipe.videoUrl}
                    coverImageUrl={featuredRecipe.imageUrl}
                    title={featuredRecipe.title}
                  />
                  <button
                    onClick={() => setIsHeroVideoOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20 z-50 cursor-pointer"
                    aria-label="Close masterclass"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Cuisine Filter Bento bar */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto -mt-10 relative z-20">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-[0_4px_25px_rgba(45,75,55,0.06)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline mb-4 text-center md:text-left">
              Explore Cuisines & Courses
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => {
                const isSel = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-sm transition-all duration-200 hover:scale-102 ${
                      isSel
                        ? "bg-primary text-on-primary shadow-md font-bold scale-102"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recipe Grid Feed */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-1">
                {selectedCategory === "all"
                  ? "Daily Creations"
                  : `${categories.find((c) => c.id === selectedCategory)?.name} Recipes`}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Showing {filteredRecipes.length} delicious culinary guides
              </p>
            </div>

            {searchQuery && (
              <span className="text-sm font-semibold text-primary bg-primary-fixed px-3 py-1 rounded-full flex items-center gap-2">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")} className="material-symbols-outlined text-xs font-black">
                  close
                </button>
              </span>
            )}
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/20 max-w-md mx-auto">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 opacity-50">
                sentiment_dissatisfied
              </span>
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">No recipes found</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                We couldn&apos;t find any recipes matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
