"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { fetchRecipesFromDB, getRecipeById, PREDEFINED_INGREDIENTS, Recipe, slugify } from "@/utils/recipeStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const initial = getRecipeById(id);
    if (initial) {
      setRecipe(initial);
      setLoading(false);
    }

    fetchRecipesFromDB().then((all) => {
      if (!isMounted) return;
      const cleanId = id.toLowerCase().trim();
      const found = all.find(
        (item) => item.id.toLowerCase() === cleanId || slugify(item.title) === cleanId
      );
      if (found) {
        setRecipe(found);
        setLoading(false);
      } else if (!initial) {
        setLoading(false);
        router.replace("/");
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id, router]);

  if (loading && !recipe) {
    return (
      <>
        <Navbar showSearch={false} />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-body-md text-body-md text-on-surface-variant font-bold">
            Loading recipe...
          </p>
        </div>
      </>
    );
  }

  if (!recipe) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.imageUrl],
    author: {
      "@type": "Person",
      name: recipe.chef?.name || "Chef Keiya",
    },
    datePublished: recipe.createdDate,
    description: recipe.description,
    prepTime: "PT20M",
    cookTime: "PT25M",
    totalTime: "PT45M",
    keywords: "Kerala Parippu Curry, Onam Sadya, Indian Vegetarian",
    recipeYield: `${recipe.serves || 6} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: "Kerala Indian",
    recipeIngredient: recipe.ingredients.map((ing) => `${ing.amount} ${ing.name}`),
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      text: typeof step === "string" ? step : step.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar showSearch={false} />

      <main className="pt-0 pb-32">
        <section className="relative w-full bg-surface-container-low py-12 pt-28 md:pt-36 flex items-center justify-center">
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="w-full aspect-video relative">
              <VideoPlayer
                videoUrl={recipe.videoUrl}
                coverImageUrl={recipe.imageUrl}
                title={recipe.title}
                initialPlaying={true}
              />
            </div>
          </div>
        </section>

        {/* Title & Category bar */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mt-8">
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
        </section>





        {/* Clean Ingredients List (No Checkboxes or Add buttons) */}
        <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h3 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold">The Essentials</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Curated ingredient list with exact proportions and culinary benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {recipe.ingredients
                .filter((ing) => ing && ing.name && ing.name.trim() !== "")
                .map((ing, index) => {
                const imgUrl =
                  ing.imageUrl ||
                  PREDEFINED_INGREDIENTS.find(
                    (m) =>
                      m.name.toLowerCase().includes(ing.name.toLowerCase()) ||
                      ing.name.toLowerCase().includes(m.name.toLowerCase())
                  )?.imageUrl ||
                  "/images/grated_coconut.jpg";

                const cleanName = ing.name
                  .replace(/Grated Coconut\s*&\s*Cumin/gi, "Grated Coconut")
                  .replace(/Pure Ghee\s*&\s*Curry Leaves/gi, "Curry Leaves");

                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-full aspect-square bg-surface-variant rounded-xl mb-4 overflow-hidden border border-outline-variant/20">
                        <img
                          src={imgUrl}
                          alt={cleanName}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-headline-sm text-sm text-primary font-bold mb-1">
                        {cleanName}
                      </h4>
                      {ing.benefit && (
                        <p className="font-body-sm text-[11px] text-outline mt-1.5 leading-relaxed">
                          {ing.benefit}
                        </p>
                      )}
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
            {recipe.steps.map((step, index) => {
              const isString = typeof step === "string";
              const stepText = isString ? step : step.text;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-headline-sm shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-headline-sm text-base text-primary font-bold">Step {index + 1}</h4>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {stepText}
                    </p>
                  </div>
                </div>
              );
            })}
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
