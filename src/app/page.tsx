"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import OnamSadyaNavigator from "@/components/OnamSadyaNavigator";
import { getRecipes, fetchRecipesFromDB, Recipe } from "@/utils/recipeStore";

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

  // Load published recipes from DB & store
  useEffect(() => {
    const loadRecipes = async () => {
      // 1. Initial fast load from local cache & defaults
      const cached = getRecipes();
      const cachedPublished = cached.filter((r) => r.status === "published" || !r.status);
      setRecipes(cachedPublished);

      // 2. Fetch fresh published recipes directly from MongoDB Cloud database
      const dbRecipes = await fetchRecipesFromDB();
      const map = new Map<string, Recipe>();
      cachedPublished.forEach((r) => map.set(r.id, r));
      dbRecipes.forEach((r) => {
        if (r.status === "published" || !r.status) map.set(r.id, r);
      });

      setRecipes(Array.from(map.values()));
    };

    loadRecipes();
  }, []);

  const handleSelectSadyaCourse = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => {
      const el = document.getElementById("search-results");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

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
    { id: "lunch", name: "Onam Sadya Curries", icon: "lunch_dining" },
    { id: "dessert", name: "Payasams & Sweets", icon: "cookie" },
    { id: "signature", name: "Chef's Signatures", icon: "workspace_premium" },
    { id: "snack", name: "Side Relishes & Chips", icon: "local_fire_department" },
    { id: "breakfast", name: "Breakfasts", icon: "sunny" },
  ];

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="pt-28 md:pt-32 pb-20">
        {/* Interactive Onam Sadya Banana Leaf Navigator */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <OnamSadyaNavigator
            onSelectCourse={handleSelectSadyaCourse}
            activeQuery={searchQuery}
          />
        </section>

        {/* Cuisine Filter Bento Bar */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto my-6 relative z-20">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-[0_4px_25px_rgba(45,75,55,0.06)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline mb-4 text-center md:text-left">
              Filter Onam Sadya Courses &amp; Dishes
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => {
                const isSel = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-sm transition-all duration-200 hover:scale-102 cursor-pointer ${
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

        {/* Dynamic Recipe Feed Section */}
        <section id="search-results" className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-2xl font-black">restaurant_menu</span>
                {searchQuery
                  ? `Onam Sadya Recipes for "${searchQuery}"`
                  : selectedCategory === "all"
                  ? "All Onam Sadya Recipes & Delicacies"
                  : `${categories.find((c) => c.id === selectedCategory)?.name}`}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Showing {filteredRecipes.length} authentic step-by-step festival guides from Chef Keiya
              </p>
            </div>

            {searchQuery && (
              <span className="text-sm font-semibold text-primary bg-primary-fixed px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-primary/20">
                Filter: &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery("")}
                  className="material-symbols-outlined text-xs font-black hover:opacity-80 cursor-pointer"
                >
                  close
                </button>
              </span>
            )}
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} showFavorite={false} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/20 max-w-md mx-auto">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 opacity-50">
                sentiment_dissatisfied
              </span>
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">No recipes found</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                We couldn&apos;t find any published recipes matching your filter. Try clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
