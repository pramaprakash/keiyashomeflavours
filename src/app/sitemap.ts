import type { MetadataRoute } from "next";
import { DEFAULT_RECIPES, Recipe } from "@/utils/recipeStore";
import { connectToDatabase } from "@/lib/db";
import RecipeModel from "@/models/Recipe";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://keiyashomeflavours.com";

  let allRecipes: Recipe[] = [...DEFAULT_RECIPES];

  try {
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 2000)
    );
    const conn = await Promise.race([connectToDatabase(), timeoutPromise]);

    if (conn) {
      const dbRecipes = await RecipeModel.find({ status: { $ne: "draft" } })
        .sort({ createdAt: -1 })
        .lean();

      if (dbRecipes && dbRecipes.length > 0) {
        const map = new Map<string, Recipe>();
        DEFAULT_RECIPES.forEach((r) => map.set(r.id, r));
        dbRecipes.forEach((r: any) => map.set(r.id, r as Recipe));
        allRecipes = Array.from(map.values());
      }
    }
  } catch (err) {
    console.error("Sitemap DB fetch error:", err);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/saved`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const recipePages: MetadataRoute.Sitemap = allRecipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.id}`,
    lastModified: new Date(recipe.createdDate || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...recipePages];
}
