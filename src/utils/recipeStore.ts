export interface MasterIngredient {
  id: string;
  name: string;
  defaultAmount?: string;
  benefit?: string;
  imageUrl: string;
  category?: string;
}

export interface Ingredient {
  id?: string;
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

export interface StepItem {
  stepNumber: number;
  text: string;
  timestampSeconds?: number;
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
  steps: (string | StepItem)[];
  category: 'signature' | 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  status?: 'draft' | 'ai_generated' | 'published';
  createdDate: string;
}

export const PREDEFINED_INGREDIENTS: MasterIngredient[] = [
  {
    id: "ing-grated-coconut",
    name: "Grated coconut",
    defaultAmount: "2 cups fresh",
    benefit: "Essential creamy, silky coconut base foundational for heritage recipes.",
    imageUrl: "/images/grated_coconut.jpg",
    category: "Produce"
  },
  {
    id: "ing-curry-leaves",
    name: "Curry leaves",
    defaultAmount: "2 sprigs",
    benefit: "Aromatic soul of traditional South Indian tempering.",
    imageUrl: "/images/curry_leaves.jpg",
    category: "Herbs"
  },
  {
    id: "ing-dried-red-chilly",
    name: "Dried red chilly",
    defaultAmount: "4 whole",
    benefit: "Smoky, vibrant warmth and visual elegance in oil tempering.",
    imageUrl: "/images/dried_red_chilly.jpg",
    category: "Spices"
  },
  {
    id: "ing-cumin",
    name: "Cumin seeds",
    defaultAmount: "1 tsp",
    benefit: "Aromatic, earthy warming spice essential for tempering.",
    imageUrl: "/images/cumin_seeds.jpg",
    category: "Spices"
  },
  {
    id: "ing-fenugreek",
    name: "Fenugreek seeds",
    defaultAmount: "1/2 tsp",
    benefit: "Distinctive bittersweet aromatic punch for pickles and curries.",
    imageUrl: "/images/fenugreek.jpg",
    category: "Spices"
  },
  {
    id: "ing-coconut-oil",
    name: "Pure Coconut Oil (Velichenna)",
    defaultAmount: "2 tbsp",
    benefit: "Cold-pressed pure oil delivering the quintessential Kerala aroma.",
    imageUrl: "/images/coconut_oil_user.jpg",
    category: "Pantry"
  },
  {
    id: "ing-green-chilly",
    name: "Green chilly",
    defaultAmount: "3 slit",
    benefit: "Fresh sharp heat and festive green color.",
    imageUrl: "/images/green_chilly.jpg",
    category: "Produce"
  },
  {
    id: "ing-garlic",
    name: "Garlic",
    defaultAmount: "6 cloves",
    benefit: "Robust savory depth and immunity-boosting aromatics.",
    imageUrl: "/images/garlic.jpg",
    category: "Produce"
  },
  {
    id: "ing-ginger",
    name: "Ginger",
    defaultAmount: "1 inch finely chopped",
    benefit: "Zesty warming digestive kick.",
    imageUrl: "/images/ginger_user_root.jpg",
    category: "Produce"
  },
  {
    id: "ing-onion",
    name: "Onion",
    defaultAmount: "1 cup chopped",
    benefit: "Natural sweetness and savory body.",
    imageUrl: "/images/onion.jpg",
    category: "Produce"
  },
  {
    id: "ing-shallots",
    name: "Shallots (Small Onions)",
    defaultAmount: "1/2 cup peeled",
    benefit: "Rich sweet flavor staple of South Indian tempering.",
    imageUrl: "/images/shallots_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-tomato",
    name: "Fresh Tomatoes",
    defaultAmount: "2 medium chopped",
    benefit: "Juicy umami tang and vibrant color.",
    imageUrl: "/images/tomato_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-tamarind",
    name: "Tamarind",
    defaultAmount: "1 lemon-sized ball",
    benefit: "Deep sour tang foundational for sambar and pickles.",
    imageUrl: "/images/tamarind_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-raw-banana",
    name: "Raw Plantain (Raw Banana)",
    defaultAmount: "2 peeled & cubed",
    benefit: "Firm texture perfect for avial, kalan, and chips.",
    imageUrl: "/images/raw_banana_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-ripe-banana",
    name: "Ripe Banana (Nendran)",
    defaultAmount: "2 sliced",
    benefit: "Naturally sweet festive fruit loved in payasam & pradhaman.",
    imageUrl: "/images/ripe_banana_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-pineapple",
    name: "Pineapple",
    defaultAmount: "1 cup cubed",
    benefit: "Tropical sweet-tangy burst for pachadi & curries.",
    imageUrl: "/images/pineapple_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-ripe-mango",
    name: "Ripe Sweet Mango",
    defaultAmount: "1 cup diced",
    benefit: "Luscious golden sweetness for mambazha pulissery.",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400&auto=format&fit=crop",
    category: "Produce"
  },
  {
    id: "ing-grapes",
    name: "Fresh Seedless Grapes",
    defaultAmount: "1 cup",
    benefit: "Juicy sweet burst contrast in festive pachadi.",
    imageUrl: "/images/grapes_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-jaggery",
    name: "Organic Jaggery",
    defaultAmount: "1/2 cup grated",
    benefit: "Pure dark sugarcane caramel sweetness.",
    imageUrl: "/images/jaggery_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-carrot",
    name: "Organic Carrots",
    defaultAmount: "2 medium baton-cut",
    benefit: "Vibrant orange sweetness and crunchy fiber.",
    imageUrl: "/images/carrot_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-bitter-gourd",
    name: "Bitter Gourd (Pavakka)",
    defaultAmount: "1 cup sliced",
    benefit: "Savory medicinal bitterness fried crisply for pickles & thoran.",
    imageUrl: "/images/bitter_gourd_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-ash-gourd",
    name: "White Ash Gourd (Kumbalanga)",
    defaultAmount: "2 cups cubed",
    benefit: "Cooling, hydrating delicacy for olan and avial.",
    imageUrl: "/images/ash_gourd_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-bottle-gourd",
    name: "Bottle Gourd (Lauki)",
    defaultAmount: "2 cups cubed",
    benefit: "Light, tender vegetable rich in water and nutrients.",
    imageUrl: "/images/bottle_gourd_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-snake-gourd",
    name: "Snake Gourd (Padavalanga)",
    defaultAmount: "1.5 cups chopped",
    benefit: "Mild, crunchy vegetable for thoran and kootu.",
    imageUrl: "/images/snake_gourd_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-beetroot",
    name: "Organic Beetroots",
    defaultAmount: "2 medium grated",
    benefit: "Earthy sweetness and striking crimson color for pachadi.",
    imageUrl: "/images/beetroot_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-yam",
    name: "Elephant Foot Yam (Chenai / Suran)",
    defaultAmount: "2 cups cubed",
    benefit: "Rich earthy root vegetable essential for Kalan, Erissery & Avial.",
    imageUrl: "/images/yam_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-drumstick",
    name: "Fresh Drumstick (Muringakka)",
    defaultAmount: "2 stalks cut into 2-inch pieces",
    benefit: "Aromatic pod signature to Kerala Sambar and Avial.",
    imageUrl: "/images/drumstick_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-beans",
    name: "French Beans",
    defaultAmount: "1 cup chopped",
    benefit: "Crisp green snap and fiber in thoran.",
    imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?q=80&w=400&auto=format&fit=crop",
    category: "Produce"
  },
  {
    id: "ing-green-peas",
    name: "Dried Green Peas",
    defaultAmount: "1 cup soaked",
    benefit: "Sweet hearty pops of protein for kurma & stew.",
    imageUrl: "/images/green_peas_user.jpg",
    category: "Pantry"
  },
  {
    id: "ing-cauliflower",
    name: "Fresh Cauliflower",
    defaultAmount: "2 cups florets",
    benefit: "Tender florets perfect for savory kurma and stir fry.",
    imageUrl: "/images/cauliflower_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-pigeon-pea",
    name: "Pigeon Pea (Toor Dal / Tuvaram Paruppu)",
    defaultAmount: "1 cup cooked",
    benefit: "Protein-rich golden lentils foundational for Kerala Sambar & Parippu Curry.",
    imageUrl: "/images/pigeon_pea_user.jpg",
    category: "Pantry"
  },
  {
    id: "ing-brinjal",
    name: "Brinjal (Eggplant / Vazhuthananga)",
    defaultAmount: "2 medium diced",
    benefit: "Tender, savory vegetable essential for authentic Kerala Sambar & Meen Curry.",
    imageUrl: "/images/brinjal_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-black-pepper",
    name: "Black Pepper Powder (Kurumulaku)",
    defaultAmount: "1 tsp freshly ground",
    benefit: "Pungent, sharp warmth central to Kerala Kalan, Rasam & Pepper Fry.",
    imageUrl: "/images/black_pepper_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-red-chilly-powder",
    name: "Red Chilly Powder (Mulaku Podi)",
    defaultAmount: "1 tbsp",
    benefit: "Fiery warmth and rich vibrant red color foundational to Kerala curries & pickles.",
    imageUrl: "/images/red_chilly_powder_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-turmeric-powder",
    name: "Turmeric Powder (Manjal Podi)",
    defaultAmount: "1/2 tsp",
    benefit: "Golden golden hue, subtle warmth, and potent natural antiseptic properties.",
    imageUrl: "/images/turmeric_powder_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-coriander-powder",
    name: "Coriander Powder (Malli Podi)",
    defaultAmount: "1 tbsp",
    benefit: "Earthy, mild citrusy aroma providing essential body to South Indian curries & gravies.",
    imageUrl: "/images/coriander_powder_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-garam-masala",
    name: "Kerala Garam Masala",
    defaultAmount: "1 tsp ground",
    benefit: "Aromatic warmth blend of cardamom, cloves, cinnamon, and star anise.",
    imageUrl: "/images/garam_masala_user.jpg",
    category: "Spices"
  },
  {
    id: "ing-salt",
    name: "Pure Sea Salt (Uppu)",
    defaultAmount: "To taste",
    benefit: "Essential seasoning that draws out natural flavors and balances taste.",
    imageUrl: "/images/salt_user.jpg",
    category: "Pantry"
  }
];

export const DEFAULT_RECIPES: Recipe[] = [
  {
    id: "parippu-curry",
    title: "Kerala Sadya Parippu Curry",
    description: "Golden roasted moong & pigeon peas simmered with freshly ground coconut, green chilies, cumin, and tempered in pure ghee with mustard seeds & curry leaves.",
    prepTime: "20 Mins",
    serves: 6,
    calories: "180 kcal",
    difficulty: "Easy",
    imageUrl: "/images/parippu_curry_thumbnail.jpg",
    videoUrl: "https://www.youtube.com/embed/ArPdf_X5wKs?si=HzFe87PcfEcDsvJC",
    flavorProfile: { spicy: 2, tangy: 1, creamy: 5 },
    story: "The iconic first course of the authentic Kerala Onam Sadya, poured hot over steaming Matta rice with a splash of pure ghee.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Pigeon Pea", amount: "1 cup roasted", benefit: "Protein-rich golden lentil base", imageUrl: "/images/pigeon_pea_user.jpg" },
      { name: "Green Chilly", amount: "3 slit", benefit: "Fresh sharp heat", imageUrl: "/images/green_chilly.jpg" },
      { name: "Turmeric Powder", amount: "1/2 tsp", benefit: "Vibrant golden hue", imageUrl: "/images/turmeric_powder_user.jpg" },
      { name: "Grated Coconut", amount: "1 cup fresh", benefit: "Rich creamy coconut base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Salt", amount: "To taste", benefit: "Essential flavor seasoning", imageUrl: "/images/salt_user.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp", benefit: "Traditional Kerala sautéing oil", imageUrl: "/images/coconut_oil_user.jpg" },
      { name: "Ginger", amount: "1 inch chopped", benefit: "Zesty digestive aromatic", imageUrl: "/images/ginger_user_root.jpg" },
      { name: "Garlic", amount: "4 cloves", benefit: "Savory aromatic depth", imageUrl: "/images/garlic.jpg" },
      { name: "Shallots", amount: "6 sliced", benefit: "Golden sautéed sweet aromatic", imageUrl: "/images/shallots_user.jpg" },
      { name: "Curry Leaves", amount: "2 sprigs", benefit: "Signature Sadya aroma", imageUrl: "/images/curry_leaves.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Cook the dal with green chilies, ginger, salt, turmeric, roasted cumin powder, and the second extract of coconut milk. Add enough water and pressure cook until done." },
      { stepNumber: 2, text: "Sauté shallots and garlic in coconut oil until lightly golden." },
      { stepNumber: 3, text: "Add curry leaves and dried red chilies and sauté for a few seconds." },
      { stepNumber: 4, text: "Add the cooked dal and mix well." },
      { stepNumber: 5, text: "Add the first extract of coconut milk and cook on low heat until you reach the desired consistency." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T22:56:00.000Z"
  }
];

const isBrowser = () => typeof window !== 'undefined';

// Master Ingredients Store
export const getMasterIngredients = (): MasterIngredient[] => {
  if (!isBrowser()) return PREDEFINED_INGREDIENTS;
  const stored = localStorage.getItem('khf_master_ingredients_v35');
  if (!stored) {
    localStorage.setItem('khf_master_ingredients_v35', JSON.stringify(PREDEFINED_INGREDIENTS));
    return PREDEFINED_INGREDIENTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return PREDEFINED_INGREDIENTS;
  }
};

export const saveMasterIngredient = (ingredient: MasterIngredient): MasterIngredient => {
  const list = getMasterIngredients();
  const index = list.findIndex(i => i.id === ingredient.id);
  let updated: MasterIngredient[];
  if (index > -1) {
    updated = list.map(i => i.id === ingredient.id ? ingredient : i);
  } else {
    updated = [ingredient, ...list];
  }
  if (isBrowser()) {
    localStorage.setItem('khf_master_ingredients_v4', JSON.stringify(updated));
    // Sync directly to MongoDB
    fetch('/api/ingredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    }).catch(err => console.error('MongoDB async sync ingredient error:', err));
  }
  return ingredient;
};

export const deleteMasterIngredient = (id: string): boolean => {
  const list = getMasterIngredients();
  const filtered = list.filter(i => i.id !== id);
  if (list.length === filtered.length) return false;
  if (isBrowser()) {
    localStorage.setItem('khf_master_ingredients_v4', JSON.stringify(filtered));
    fetch(`/api/ingredients/${id}`, { method: 'DELETE' }).catch(err =>
      console.error('MongoDB async delete ingredient error:', err)
    );
  }
  return true;
};

const sanitizeRecipe = (r: Recipe): Recipe => {
  if (!r || !Array.isArray(r.ingredients)) return r;
  return {
    ...r,
    ingredients: r.ingredients
      .filter((ing) => ing && ing.name && ing.name.trim().toLowerCase() !== "ingredient")
      .map((ing) => {
        let name = ing.name || "";
        name = name.replace(/Grated Coconut\s*&\s*Cumin/gi, "Grated Coconut");
        name = name.replace(/Pure Ghee\s*&\s*Curry Leaves/gi, "Curry Leaves");
        return {
          ...ing,
          name: name,
        };
      }),
  };
};

// Recipe Store
export const getRecipes = (): Recipe[] => {
  return DEFAULT_RECIPES.map(sanitizeRecipe);
};

export const fetchRecipesFromDB = async (): Promise<Recipe[]> => {
  return getRecipes();
};

export const fetchMasterIngredientsFromDB = async (): Promise<MasterIngredient[]> => {
  try {
    const res = await fetch('/api/ingredients', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && Array.isArray(data.ingredients) && data.ingredients.length > 0) {
      const validIds = new Set(PREDEFINED_INGREDIENTS.map(i => i.id));
      const filtered = data.ingredients.filter((i: MasterIngredient) => validIds.has(i.id));
      const result = filtered.length > 0 ? filtered : PREDEFINED_INGREDIENTS;
      if (isBrowser()) {
        localStorage.setItem('khf_master_ingredients_v35', JSON.stringify(result));
      }
      return result;
    }
  } catch (err) {
    console.error('Failed to fetch ingredients from DB API:', err);
  }
  return getMasterIngredients();
};

export const getRecipeById = (id: string): Recipe | undefined => {
  const recipes = getRecipes();
  return recipes.find(r => r.id === id);
};

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const recipes = getRecipes();
  const index = recipes.findIndex(r => r.id === recipe.id);
  let updated: Recipe[];
  if (index > -1) {
    updated = recipes.map(r => r.id === recipe.id ? recipe : r);
  } else {
    updated = [recipe, ...recipes];
  }
  
  if (isBrowser()) {
    // 1. Immediately update LocalStorage for fast UI feedback
    localStorage.setItem('khf_recipes_v36', JSON.stringify(updated));

    // 2. Persist directly to MongoDB Cloud database
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
      const data = await res.json();
      if (!data.success) {
        console.error('MongoDB save error response:', data);
      }
    } catch (err) {
      console.error('MongoDB async sync recipe error:', err);
    }
  }
  return recipe;
};

export const deleteRecipe = async (id: string): Promise<boolean> => {
  const recipes = getRecipes();
  const filtered = recipes.filter(r => r.id !== id);
  if (recipes.length === filtered.length) return false;
  if (isBrowser()) {
    localStorage.setItem('krishnas_kitchen_recipes', JSON.stringify(filtered));
    try {
      await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('MongoDB async delete recipe error:', err);
    }
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
