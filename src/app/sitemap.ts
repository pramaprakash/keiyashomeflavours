import type { MetadataRoute } from "next";
import { DEFAULT_RECIPES } from "@/utils/recipeStore";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://keiyashomeflavours.com";

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

  const recipePages: MetadataRoute.Sitemap = DEFAULT_RECIPES.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.id}`,
    lastModified: new Date(recipe.createdDate || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...recipePages];
}
