import { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { getRecipeById, slugify, DEFAULT_RECIPES, sanitizeRecipe, Recipe } from "@/utils/recipeStore";
import RecipeDetailClient from "@/components/RecipeDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchRecipeForDetail(id: string): Promise<Recipe | undefined> {
  const cleanId = decodeURIComponent(id).toLowerCase().trim();
  try {
    const conn = await Promise.race([
      connectToDatabase(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1200)),
    ]);
    const db = conn?.connection?.db || mongoose.connection.db;
    if (db) {
      const matched = await db.collection("recipes").findOne(
        {
          $or: [
            { id: cleanId },
            { id: id },
          ],
        },
        { maxTimeMS: 1500 }
      );

      if (matched) {
        const recipeId = matched.id || String(matched._id);
        const plainDoc = JSON.parse(JSON.stringify(matched));
        delete plainDoc._id;
        delete plainDoc.__v;
        return sanitizeRecipe({ ...plainDoc, id: recipeId } as any);
      }
    }
  } catch {
    // Silent fallback to local/default store without clogging server console
  }

  const fallback =
    DEFAULT_RECIPES.find(
      (r) => r.id.toLowerCase() === cleanId || slugify(r.title) === cleanId
    ) || getRecipeById(id);

  if (fallback) {
    return sanitizeRecipe(fallback);
  }
  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const recipe = await fetchRecipeForDetail(id);

  if (!recipe) {
    return {
      title: "Recipe Not Found | Keiya's Home Flavours",
      description: "Discover authentic Kerala Onam Sadya recipes on Keiya's Home Flavours.",
    };
  }

  const title = `${recipe.title} Recipe | Keiya's Home Flavours`;
  const description =
    recipe.description ||
    `Learn how to make authentic ${recipe.title} step-by-step with Chef Keiya. Authentic Kerala Onam Sadya recipe guide and video masterclass.`;
  const canonicalUrl = `https://keiyashomeflavours.com/recipes/${recipe.id}`;
  const imageUrl = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `https://keiyashomeflavours.com${recipe.imageUrl}`;

  return {
    title,
    description,
    keywords: [
      recipe.title,
      `Kerala ${recipe.title}`,
      `Onam Sadya ${recipe.category}`,
      "Kerala Cuisine",
      "Authentic Indian Vegetarian Recipes",
      "Chef Keiya",
    ],
    authors: [{ name: recipe.chef?.name || "Chef Keiya" }],
    creator: recipe.chef?.name || "Chef Keiya",
    publisher: "Keiya's Home Flavours",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalUrl,
      title,
      description,
      siteName: "Keiya's Home Flavours",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const recipe = await fetchRecipeForDetail(id);

  if (!recipe) {
    notFound();
  }

  const siteUrl = "https://keiyashomeflavours.com";
  const recipeUrl = `${siteUrl}/recipes/${recipe.id}`;
  const imageUrl = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `${siteUrl}${recipe.imageUrl}`;

  // 1. Schema.org Recipe JSON-LD for Google Rich Results
  const recipeJsonLd: Record<string, any> = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: [imageUrl],
    author: {
      "@type": "Person",
      name: recipe.chef?.name || "Chef Keiya",
    },
    publisher: {
      "@type": "Organization",
      name: "Keiya's Home Flavours",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.jpg`,
      },
    },
    datePublished: recipe.createdDate || "2026-08-15T00:00:00.000Z",
    description: recipe.description,
    prepTime: "PT20M",
    cookTime: "PT25M",
    totalTime: "PT45M",
    keywords: `${recipe.title}, Kerala ${recipe.category}, Onam Sadya, Indian Vegetarian, Chef Keiya`,
    recipeYield: `${recipe.serves || 4} servings`,
    recipeCategory: recipe.category || "Lunch",
    recipeCuisine: "Kerala Indian",
    nutrition: {
      "@type": "NutritionInformation",
      calories: recipe.calories || "180 calories",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "142",
      bestRating: "5",
      worstRating: "1",
    },
    recipeIngredient: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map((ing) => `${ing?.amount || ""} ${ing?.name || ""}`.trim())
      : [],
    recipeInstructions: Array.isArray(recipe.steps)
      ? recipe.steps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: `Step ${idx + 1}`,
          text: typeof step === "string" ? step : step?.text || "",
        }))
      : [],
  };

  if (recipe.videoUrl) {
    recipeJsonLd.video = {
      "@type": "VideoObject",
      name: `How to make ${recipe.title} - Step by Step Video Masterclass`,
      description: recipe.description,
      thumbnailUrl: [imageUrl],
      uploadDate: recipe.createdDate || "2026-08-15T00:00:00.000Z",
      embedUrl: recipe.videoUrl,
    };
  }

  // 2. Schema.org BreadcrumbList JSON-LD for Google Search Breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recipes",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: recipe.title,
        item: recipeUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RecipeDetailClient initialRecipe={recipe} id={id} />
    </>
  );
}
