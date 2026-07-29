"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { getRecipeById, Recipe, isFavorite, toggleFavorite } from "@/utils/recipeStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const r = getRecipeById(id);
    if (r) {
      setRecipe(r);
      setServings(r.serves);
      setIsFav(isFavorite(r.id));
    }
  }, [id]);

  if (!recipe) {
    return (
      <>
        <Navbar showSearch={false} />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <span className="material-symbols-outlined text-6xl text-primary mb-4 opacity-50">
            search_off
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Recipe Not Found</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
            We couldn&apos;t find the recipe you were looking for. It may have been deleted or moved.
          </p>
          <Link
            href="/"
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow hover:opacity-90 active:scale-95 transition-all"
          >
            Back to Discover
          </Link>
        </div>
      </>
    );
  }

  const handleFavoriteToggle = () => {
    const newFav = toggleFavorite(recipe.id);
    setIsFav(newFav);
  };

  const handleIngredientCheck = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Utility to scale ingredient quantity dynamically
  const getScaledAmount = (amountStr: string) => {
    const originalServings = recipe.serves;
    const factor = servings / originalServings;

    // Regex to match a decimal or integer at the start of the string
    const match = amountStr.match(/^([0-9\.\/]+)\s*(.*)$/);
    if (!match) return amountStr;

    const rawNum = match[1];
    const unit = match[2];

    let val = 0;
    if (rawNum.includes("/")) {
      const parts = rawNum.split("/");
      if (parts.length === 2) {
        val = parseFloat(parts[0]) / parseFloat(parts[1]);
      }
    } else {
      val = parseFloat(rawNum);
    }

    if (isNaN(val)) return amountStr;

    const scaled = val * factor;
    // Format to nice decimals (max 2 decimals)
    const formatted = parseFloat(scaled.toFixed(2)).toString();
    return `${formatted} ${unit}`;
  };

  return (
    <>
      <Navbar showSearch={false} />

      <main className="pt-24 pb-32">
        {/* Hero Section containing the video player */}
        <section className="relative w-full h-[60vh] md:h-[75vh] bg-surface-container-low overflow-hidden">
          <div className="w-full h-full max-w-5xl mx-auto p-4 md:p-8 flex items-center justify-center">
            <div className="w-full h-full aspect-video md:h-full relative">
              <VideoPlayer
                videoUrl={recipe.videoUrl}
                coverImageUrl={recipe.imageUrl}
                title={recipe.title}
              />
            </div>
          </div>
        </section>

        {/* Title, Category & Favorite bar */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-4 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest font-bold">
                {recipe.category}
              </span>
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Added {new Date(recipe.createdDate).toLocaleDateString()}
              </span>
            </div>
            <h2 className="font-headline-xl text-3xl md:text-5xl font-black text-primary leading-tight">
              {recipe.title}
            </h2>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest text-primary hover:bg-surface-container transition-all active:scale-95"
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: isFav ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400",
                color: isFav ? "var(--color-error)" : "inherit",
              }}
            >
              favorite
            </span>
            {isFav ? "Saved to Recipes" : "Save Recipe"}
          </button>
        </section>

        {/* Stats & Flavor Profile (Bento Grid Style) */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Quick Info Card */}
            <div className="md:col-span-5 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_4px_20px_rgba(45,75,55,0.04)] flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-label-md text-[11px] text-outline uppercase tracking-wider">Prep Time</p>
                  <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1">{recipe.prepTime}</p>
                </div>
                <div>
                  <p className="font-label-md text-[11px] text-outline uppercase tracking-wider">Servings</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-7 h-7 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg active:scale-90 transition-all"
                    >
                      -
                    </button>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold w-6 text-center">
                      {servings}
                    </span>
                    <button
                      onClick={() => setServings(Math.min(12, servings + 1))}
                      className="w-7 h-7 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg active:scale-90 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-label-md text-[11px] text-outline uppercase tracking-wider">Calories</p>
                  <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1">{recipe.calories}</p>
                </div>
                <div>
                  <p className="font-label-md text-[11px] text-outline uppercase tracking-wider">Difficulty</p>
                  <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1">{recipe.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Flavor Profile Card */}
            <div className="md:col-span-7 bg-primary p-8 rounded-2xl text-on-primary shadow-lg overflow-hidden relative flex flex-col justify-between min-h-[200px]">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[100px]">restaurant_menu</span>
              </div>
              <div className="relative z-10 w-full">
                <h3 className="font-headline-md text-headline-md mb-6 text-white font-bold">The Flavor Profile</h3>
                <div className="flex flex-wrap gap-8">
                  {/* Spicy */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center bg-primary-container">
                      <span
                        className="material-symbols-outlined text-primary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-xs text-primary-fixed-dim uppercase tracking-wider">Spicy</p>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className={`w-2.5 h-2.5 rounded-full ${
                              recipe.flavorProfile.spicy >= num
                                ? "bg-primary-fixed-dim"
                                : "bg-primary-fixed-dim/20"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tangy */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center bg-primary-container">
                      <span
                        className="material-symbols-outlined text-primary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        nutrition
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-xs text-primary-fixed-dim uppercase tracking-wider">Tangy</p>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className={`w-2.5 h-2.5 rounded-full ${
                              recipe.flavorProfile.tangy >= num
                                ? "bg-primary-fixed-dim"
                                : "bg-primary-fixed-dim/20"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Creamy */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center bg-primary-container">
                      <span
                        className="material-symbols-outlined text-primary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        opacity
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-xs text-primary-fixed-dim uppercase tracking-wider">Creamy</p>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className={`w-2.5 h-2.5 rounded-full ${
                              recipe.flavorProfile.creamy >= num
                                ? "bg-primary-fixed-dim"
                                : "bg-primary-fixed-dim/20"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Chef Story Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Story text */}
            <div className="md:col-span-7">
              <h3 className="font-headline-lg text-headline-lg text-primary mb-6 font-bold">The Chef&apos;s Story</h3>
              <div className="space-y-6">
                {recipe.story.split("\n\n").map((para, i) => (
                  <p key={i} className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {para}
                  </p>
                ))}
                <div className="pt-6 border-t border-outline-variant/30 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant/50">
                    <img
                      src={recipe.chef.avatarUrl}
                      alt={recipe.chef.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-primary font-bold">{recipe.chef.name}</p>
                    <p className="font-body-sm text-body-sm text-outline">{recipe.chef.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Graphic Image */}
            <div className="md:col-span-5 relative group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative bg-surface-container">
                <img
                  src={recipe.imageUrl}
                  alt="Process closeup"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-fixed rounded-xl -z-10 hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* Interactive Ingredients List */}
        <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h3 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold">The Essentials</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tick off items as you gather them in your kitchen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {recipe.ingredients.map((ing, index) => {
                const checked = !!checkedIngredients[index];
                return (
                  <div
                    key={index}
                    onClick={() => handleIngredientCheck(index)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-full group ${
                      checked
                        ? "bg-surface-container-high border-outline opacity-60"
                        : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50"
                    }`}
                  >
                    <div>
                      {ing.imageUrl && (
                        <div className="w-full aspect-square bg-surface-variant rounded-xl mb-4 overflow-hidden">
                          <img
                            src={ing.imageUrl}
                            alt={ing.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-primary select-none mt-0.5"
                          style={{ fontVariationSettings: checked ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {checked ? "check_box" : "check_box_outline_blank"}
                        </span>
                        <h4
                          className={`font-headline-sm text-sm text-primary font-bold ${
                            checked ? "line-through" : ""
                          }`}
                        >
                          {ing.name}
                        </h4>
                      </div>
                      {ing.benefit && (
                        <p className="font-body-sm text-[11px] text-outline mt-2 leading-relaxed">
                          {ing.benefit}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-outline tracking-wider">Required</span>
                      <span className="text-xs font-bold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                        {getScaledAmount(ing.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cooking Instructions Steps */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto py-16">
          <div className="mb-10">
            <h3 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold">Preparation & Cooking</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Follow these structural culinary rituals to execute this dish perfectly.
            </p>
          </div>

          <div className="space-y-6">
            {recipe.steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/20 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-headline-sm shadow-md">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-headline-sm text-base text-primary font-bold mb-2">Step {index + 1}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 border border-outline-variant/50 bg-surface p-4 rounded-xl text-sm font-bold text-primary hover:bg-surface-container transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Recipe Feed
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
