export interface Ingredient {
  name: string;
  amount: string;
  benefit?: string;
  imageUrl?: string;
}

export interface FlavorProfile {
  spicy: number;
  tangy: number;
  creamy: number;
}

export interface Chef {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  serves: number;
  calories: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  videoUrl: string;
  flavorProfile: FlavorProfile;
  story: string;
  chef: Chef;
  ingredients: Ingredient[];
  steps: string[];
  category: 'signature' | 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  createdDate: string;
}

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: "beetroot-pachadi",
    title: "Beetroot Pachadi",
    description: "A vibrant symphony of earthy beetroots, creamy tempered yogurt, and the sharp crackle of mustard seeds.",
    prepTime: "15 Mins",
    serves: 4,
    calories: "180 kcal",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/3c_vU-0fR90", // A high-quality South Indian style cooking embed video
    flavorProfile: {
      spicy: 2,
      tangy: 3,
      creamy: 4
    },
    story: "In the kitchens of Tamil Nadu, Beetroot Pachadi isn't just a side dish; it's a celebration of color and contrast. I remember my grandmother grating fresh beets as the sun began to set, the kitchen filling with the aroma of tempering curry leaves.\n\nAt Keiya's Home Flavour's, we reimagine this heritage staple. We slow-roast the beets to concentrate their natural sugars before folding them into thick, hand-whisked yogurt. The final 'tadka'—or tempering—is a ritualistic addition of mustard seeds and dried chilies that provides the essential crunch and heat.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgch980p1hgbKKyIF6wMr4pWW0TkQS59r2C0FRS2YarKAAGn2UD4zHpYsf7ovaDsX5N0xDyIPUFC98HxY17uv0fr0aQ9mNArNSyoVTBkJtlWUgvVA7pLuQjTLTgmwlliKcTG3aCwDRkqcVsEE2L2cS650TRf2qPJd0MQN7kZLm1yCDDwT7WnF8XzvBzOKhrTVeF-7fCoVfejePXIKvxLDfMHiI2LPM-OqnHCK7cN5GC8S7FVmVf0a7"
    },
    ingredients: [
      {
        name: "Organic Beetroots",
        amount: "3 medium",
        benefit: "Earthy, sweet, and rich in antioxidants.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAscam3tCLpAdVNkc64cm5xJU-mry2S3Fz2fh59JkR3FHemwJQgQwxVzTtncxKf7KzZFiwcxmbsqBqebwGwtFofIFYpuVf5IDJfOw3X5FT2lWPOE5XHzXJeHYlbGt4PTkop-aTp73m8LaH3yhg0nZdfFSMWIg1RRioa3QOcpR7udKhB76YZNI8ll2-Kh2YiP9mckFepfNEdRgnvWOzOCTorX9_zK4Ep6lO18m2l1G35Gk-pECy1_9O2"
      },
      {
        name: "Mustard Seeds",
        amount: "1 tsp",
        benefit: "The essential 'pop' of South Indian flavor.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnq7RI9ro8EOUdov3sdUUfaW8hU26ua-qKCrjdDtJinXi-0yY87OMvqATy8JBCF-qAaNoOz22wBR98K5IF3gfY8gKe0fmSbU3WvI0kVY8G0HynMXS9jtg3g0jcNTINaOnkHNnTGCvrKRh5x9lwEnRvda6cofwKWj3vtnMNRhpYPYBa7fwlQ-HjlTAMkaW4YrE34RqNvd1v-sOSAccwsqBMW0whsFHccIDyNnjjAAFDiSyHLbbWhdK"
      },
      {
        name: "Hung Curd",
        amount: "1.5 cups",
        benefit: "Thick, creamy base for a luxurious mouthfeel.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp3V7wq94nIBBCw0TkuYZb1kNudmbRMIcGzNjsA1WTrpOZQv2Whg-8-ryJJGK9yk33ffHp_LZHSbb5peNDm5ddWcPFCwNKr-d7PHcYyk_QAkTgRUmLIzeYAXhQeiuEQlZkFQ4f9gYPKvUb0ZIwpjL4XkHQgLTy1kZXZNWr9u_JN0V-jU_NqvUTxAM3ql5AyeHwA0VDfDQeFZj_rX8k5Bm7MB78O2RgYzhcuIuqnXDraohHMqq93LoJ"
      },
      {
        name: "Curry Leaves",
        amount: "2 sprigs",
        benefit: "Aromatic soul of the tempering process.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN62uQf3FtkuGY0Lqg_1ToakqhpEB1GALbY2N_PQhlvWCtjdkjFOGkIVKfuI4yoOb1C-H-DNo_E8S_z3eRknabM4WosZiclJb6ik1LYMxHSQPy5CJDG3qlwRBrBAYnWjACef26fURHufpVTo9uBSam4-WhOysY7vioJdz2Gigt8Gg9LZW7kfO2_Nojr8wrzH-aSRtcnN80b-z6cPrnYVrX_GPxXQzgIgtloYBVl3rmnSk0gFxo31Ah"
      }
    ],
    steps: [
      "Wash, peel, and finely grate the fresh organic beetroots.",
      "Heat a tablespoon of coconut oil in a pan, add the grated beetroot and a pinch of salt, and sauté on low heat for 5-7 minutes until soft. Let it cool completely.",
      "In a bowl, whisk the hung curd until completely smooth. Fold in the cooled beetroot mixture until the entire yogurt turns a vibrant, signature pink color.",
      "For the tempering (tadka): heat coconut oil in a small pan, add mustard seeds and let them crackle. Add dry red chilies, green chilies, and fresh curry leaves. Pour this hot, sizzling mixture over the beetroot yogurt and serve chilled."
    ],
    category: "signature",
    createdDate: "2026-07-29T20:00:00.000Z"
  },
  {
    id: "masala-dosa",
    title: "Classic Masala Dosa",
    description: "Crispy, golden rice-and-lentil crepes filled with a spiced, savory potato mash, served with coconut chutney and sambar.",
    prepTime: "30 Mins",
    serves: 2,
    calories: "320 kcal",
    difficulty: "Hard",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/S43yzoWdtIM", // Masala Dosa video embed
    flavorProfile: {
      spicy: 3,
      tangy: 2,
      creamy: 1
    },
    story: "Dosa making is an art form perfected across generations. From the overnight fermentation of the batter to the skilled sweep of the ladle across a blazing hot tawa, every step is deliberate. Our spiced potato filling uses fresh curry leaves, turmeric, mustard seeds, and caramelized onions to create the ultimate comforting bite.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgch980p1hgbKKyIF6wMr4pWW0TkQS59r2C0FRS2YarKAAGn2UD4zHpYsf7ovaDsX5N0xDyIPUFC98HxY17uv0fr0aQ9mNArNSyoVTBkJtlWUgvVA7pLuQjTLTgmwlliKcTG3aCwDRkqcVsEE2L2cS650TRf2qPJd0MQN7kZLm1yCDDwT7WnF8XzvBzOKhrTVeF-7fCoVfejePXIKvxLDfMHiI2LPM-OqnHCK7cN5GC8S7FVmVf0a7"
    },
    ingredients: [
      {
        name: "Fermented Dosa Batter",
        amount: "2 cups",
        benefit: "Probiotic rich, airy, and produces ultra-crispy edges.",
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300&auto=format&fit=crop"
      },
      {
        name: "Potatoes",
        amount: "3 boiled & mashed",
        benefit: "Naturally gluten-free, soft, comforting texture.",
        imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=300&auto=format&fit=crop"
      },
      {
        name: "Onions & Green Chilies",
        amount: "1 cup chopped",
        benefit: "Sharp sweetness and fresh spicy kick.",
        imageUrl: "https://images.unsplash.com/photo-1508747702-f89f0f40cbc9?q=80&w=300&auto=format&fit=crop"
      }
    ],
    steps: [
      "Prepare the potato masala filling: Heat oil, add mustard seeds, chana dal, urad dal, curry leaves, and green chilies. Sauté sliced onions until translucent. Add turmeric and salt, then fold in the mashed potatoes. Add water to make it slightly moist.",
      "Heat a flat non-stick or cast-iron tawa. Sprinkle a few drops of water to cool it down, and wipe clean.",
      "Pour a large ladleful of batter in the center. Spread it quickly in a circular motion outwards to form a thin crepe.",
      "Drizzle ghee or oil around the edges. Let it cook on medium heat until golden brown and crispy.",
      "Place a scoop of potato masala in the center, fold the dosa into a cylinder or triangle, and serve hot with fresh coconut chutney."
    ],
    category: "breakfast",
    createdDate: "2026-07-29T18:30:00.000Z"
  },
  {
    id: "traditional-avial",
    title: "Heritage Avial",
    description: "A thick mixture of native vegetables and coconut, seasoned with fresh coconut oil and aromatic curry leaves.",
    prepTime: "25 Mins",
    serves: 4,
    calories: "210 kcal",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/n4P8X_Rk9-E", // Avial video embed
    flavorProfile: {
      spicy: 1,
      tangy: 3,
      creamy: 3
    },
    story: "Avial is said to have been invented by Bhima, one of the Pandava brothers, during their exile. Legend says he had to cook, but there weren't enough individual vegetables to make single dishes, so he chopped whatever was available and boiled them together with coconut. Today, it stands as a cornerstone of the traditional South Indian feast.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgch980p1hgbKKyIF6wMr4pWW0TkQS59r2C0FRS2YarKAAGn2UD4zHpYsf7ovaDsX5N0xDyIPUFC98HxY17uv0fr0aQ9mNArNSyoVTBkJtlWUgvVA7pLuQjTLTgmwlliKcTG3aCwDRkqcVsEE2L2cS650TRf2qPJd0MQN7kZLm1yCDDwT7WnF8XzvBzOKhrTVeF-7fCoVfejePXIKvxLDfMHiI2LPM-OqnHCK7cN5GC8S7FVmVf0a7"
    },
    ingredients: [
      {
        name: "Mixed Vegetables (Carrot, Yam, Drumstick, Beans)",
        amount: "3 cups batons",
        benefit: "Diverse array of vitamins, minerals, and dietary fibers.",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop"
      },
      {
        name: "Grated Coconut & Cumin",
        amount: "1 cup",
        benefit: "Healthy fats and deep aromatic flavor base.",
        imageUrl: "https://images.unsplash.com/photo-1550596334-7bb40a719f14?q=80&w=300&auto=format&fit=crop"
      },
      {
        name: "Fresh Yogurt",
        amount: "1/2 cup",
        benefit: "Adds a pleasant sourness and binds the mixture.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp3V7wq94nIBBCw0TkuYZb1kNudmbRMIcGzNjsA1WTrpOZQv2Whg-8-ryJJGK9yk33ffHp_LZHSbb5peNDm5ddWcPFCwNKr-d7PHcYyk_QAkTgRUmLIzeYAXhQeiuEQlZkFQ4f9gYPKvUb0ZIwpjL4XkHQgLTy1kZXZNWr9u_JN0V-jU_NqvUTxAM3ql5AyeHwA0VDfDQeFZj_rX8k5Bm7MB78O2RgYzhcuIuqnXDraohHMqq93LoJ"
      }
    ],
    steps: [
      "Cut all native vegetables into 2-inch thin baton shapes. Cook them with water, turmeric powder, and salt until they are tender but not mushy.",
      "Grind the grated coconut, green chilies, and cumin seeds into a coarse paste without adding too much water.",
      "Add the coconut paste to the cooked vegetables and simmer for 3 minutes on low heat.",
      "Turn off the heat. Stir in well-beaten sour yogurt.",
      "Drizzle raw cold-pressed coconut oil and fresh curry leaves over the top. Cover immediately to lock in the aroma for 5 minutes before serving."
    ],
    category: "lunch",
    createdDate: "2026-07-29T15:00:00.000Z"
  }
];

// Helper to check if running in browser
const isBrowser = () => typeof window !== 'undefined';

export const getRecipes = (): Recipe[] => {
  if (!isBrowser()) return DEFAULT_RECIPES;
  const stored = localStorage.getItem('krishnas_kitchen_recipes');
  if (!stored) {
    localStorage.setItem('krishnas_kitchen_recipes', JSON.stringify(DEFAULT_RECIPES));
    return DEFAULT_RECIPES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_RECIPES;
  }
};

export const getRecipeById = (id: string): Recipe | undefined => {
  const recipes = getRecipes();
  return recipes.find(r => r.id === id);
};

export const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdDate'>): Recipe => {
  const recipes = getRecipes();
  const newId = recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Make sure ID is unique
  let finalId = newId;
  let counter = 1;
  while (recipes.some(r => r.id === finalId)) {
    finalId = `${newId}-${counter}`;
    counter++;
  }

  const newRecipe: Recipe = {
    ...recipe,
    id: finalId,
    createdDate: new Date().toISOString()
  };

  const updated = [newRecipe, ...recipes];
  if (isBrowser()) {
    localStorage.setItem('krishnas_kitchen_recipes', JSON.stringify(updated));
  }
  return newRecipe;
};

export const deleteRecipe = (id: string): boolean => {
  const recipes = getRecipes();
  const filtered = recipes.filter(r => r.id !== id);
  if (recipes.length === filtered.length) return false;
  if (isBrowser()) {
    localStorage.setItem('krishnas_kitchen_recipes', JSON.stringify(filtered));
  }
  return true;
};

export const getFavorites = (): string[] => {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem('krishnas_kitchen_favorites');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const toggleFavorite = (id: string): boolean => {
  if (!isBrowser()) return false;
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  let updated: string[];
  let isFav = false;
  if (index > -1) {
    updated = favorites.filter(f => f !== id);
  } else {
    updated = [...favorites, id];
    isFav = true;
  }
  localStorage.setItem('krishnas_kitchen_favorites', JSON.stringify(updated));
  return isFav;
};

export const isFavorite = (id: string): boolean => {
  if (!isBrowser()) return false;
  return getFavorites().includes(id);
};
