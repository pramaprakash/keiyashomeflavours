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
    id: "ing-mustard",
    name: "Mustard Seeds (Kaduku)",
    defaultAmount: "1 tsp",
    benefit: "Essential popping aromatic spice for traditional Kerala oil tempering (Thalippu).",
    imageUrl: "/images/mustard_user.jpg",
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
    id: "ing-potato",
    name: "Fresh Potatoes (Urulakkizhangu)",
    defaultAmount: "2 medium boiled & cubed",
    benefit: "Comforting starchy staple essential for stew, roast & curries.",
    imageUrl: "/images/potato_user.jpg",
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
    id: "ing-kovakka",
    name: "Ivy Gourd (Kovakka / Tendli)",
    defaultAmount: "1.5 cups sliced lengthwise",
    benefit: "Crunchy green staple perfect for Kerala Kovakka Fry & Mezhukkupuratti.",
    imageUrl: "/images/kovakka_user.jpg",
    category: "Produce"
  },
  {
    id: "ing-vellari",
    name: "Malabar Cucumber (Kani Vellari / Golden Cucumber)",
    defaultAmount: "2 cups cubed",
    benefit: "Hydrating, crisp yellow melon essential for Kerala Pulissery, Kalan & Sambar.",
    imageUrl: "/images/vellari_user.jpg",
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
    name: "Yardlong Beans (Achinga Payar / Long Beans)",
    defaultAmount: "1.5 cups finely chopped",
    benefit: "Tender, crunchy long green beans essential for authentic Achinga Payar Thoran & Mezhukkupuratti.",
    imageUrl: "/images/long_beans_user.jpg",
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
    id: "ing-curd",
    name: "Fresh Whisked Curd (Thayir / Yogurt)",
    defaultAmount: "1 cup whisked",
    benefit: "Rich probiotic creamy base for Kerala Kalan, Pulissery, Pachadi & Moru Curry.",
    imageUrl: "/images/curd_user.jpg",
    category: "Dairy"
  },
  {
    id: "ing-water",
    name: "Pure Water (Vellam)",
    defaultAmount: "As needed",
    benefit: "Essential fluid for boiling, simmering, and adjusting curry consistency.",
    imageUrl: "/images/water_user.jpg",
    category: "Pantry"
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
      { name: "Turmeric Powder (Manjal Podi)", amount: "1/2 tsp", benefit: "Vibrant golden hue", imageUrl: "/images/turmeric_powder_user.jpg" },
      { name: "Grated Coconut", amount: "1 cup fresh", benefit: "Rich creamy coconut base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Pure Sea Salt (Uppu)", amount: "To taste", benefit: "Essential flavor seasoning", imageUrl: "/images/salt_user.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp", benefit: "Traditional Kerala sautéing oil", imageUrl: "/images/coconut_oil_user.jpg" },
      { name: "Mustard Seeds (Kaduku)", amount: "1 tsp", benefit: "Essential popping aromatic spice for oil tempering", imageUrl: "/images/mustard_user.jpg" },
      { name: "Pure Water (Vellam)", amount: "As needed", benefit: "Essential liquid for pressure cooking lentils", imageUrl: "/images/water_user.jpg" },
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
  },
  {
    id: "kurukku-kalan",
    title: "Kurukku Kalan",
    description: "Kalan is a traditional Kerala Sadhya dish made with raw banana, yam, sour curd, coconut, and aromatic spices. This creamy, tangy, and flavorful dish is a must-have for an authentic Onam Sadhya.",
    prepTime: "20 Mins",
    serves: 4,
    calories: "250 kcal",
    difficulty: "Medium",
    imageUrl: "/uploads/1786767293409-Firefly__7_.png",
    videoUrl: "https://www.youtube.com/embed/RawqnrEo3Ks?si=-DSNa46AZULeli6K",
    flavorProfile: { spicy: 2, tangy: 2, creamy: 3 },
    story: "Heritage Kerala Sadhya delicacy simmered down to a thick, rich peppered curd gravity.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Fresh Whisked Curd (Thayir / Yogurt)", amount: "1 cup whisked", benefit: "Rich probiotic creamy base for Kerala Kalan", imageUrl: "/images/curd_user.jpg" },
      { name: "Raw Plantain (Raw Banana)", amount: "2 peeled & cubed", benefit: "Firm texture perfect for kalan", imageUrl: "/images/raw_banana_user.jpg" },
      { name: "Grated coconut", amount: "2 cups fresh", benefit: "Essential creamy coconut base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Turmeric Powder (Manjal Podi)", amount: "1/2 tsp", benefit: "Vibrant golden color", imageUrl: "/images/turmeric_powder_user.jpg" },
      { name: "Black Pepper Powder (Kurumulaku)", amount: "1 tsp freshly ground", benefit: "Pungent sharp warmth", imageUrl: "/images/black_pepper_user.jpg" },
      { name: "Red Chilly Powder (Mulaku Podi)", amount: "1 tbsp", benefit: "Fiery warmth and rich color", imageUrl: "/images/red_chilly_powder_user.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp", benefit: "Cold-pressed pure oil", imageUrl: "/images/coconut_oil_user.jpg" },
      { name: "Mustard Seeds (Kaduku)", amount: "1 tsp", benefit: "Essential popping aromatic spice for oil tempering", imageUrl: "/images/mustard_user.jpg" },
      { name: "Pure Water (Vellam)", amount: "As needed", benefit: "Essential fluid for boiling vegetables & spices", imageUrl: "/images/water_user.jpg" },
      { name: "Cumin seeds", amount: "1 tsp", benefit: "Aromatic, earthy warming spice essential for grinding paste", imageUrl: "/images/cumin_seeds.jpg" },
      { name: "Fenugreek seeds", amount: "1/2 tsp", benefit: "Bittersweet aromatic punch for tempering", imageUrl: "/images/fenugreek.jpg" },
      { name: "Curry leaves", amount: "2 sprigs", benefit: "Signature aroma", imageUrl: "/images/curry_leaves.jpg" },
      { name: "Pure Sea Salt (Uppu)", amount: "To taste", benefit: "Essential seasoning", imageUrl: "/images/salt_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Peel and cut the raw banana into medium-sized pieces. Cook with salt, turmeric powder, chilly powder, pepper powder, and enough water until tender." },
      { stepNumber: 2, text: "Once the water has almost dried up, add a coarsely ground paste of coconut, green chilly, and cumin. Mix well." },
      { stepNumber: 3, text: "Cook until the coconut mixture is well combined and most of the moisture has evaporated." },
      { stepNumber: 4, text: "Lower the flame and add the whisked curd. Mix gently and heat briefly. Do not let the curd boil. Switch off the flame." },
      { stepNumber: 5, text: "Mix gently and serve as part of a traditional Kerala Sadhya." }
    ],
    category: "signature",
    status: "published",
    createdDate: "2026-08-15T04:14:38.990Z"
  },
  {
    id: "kerala-sadya-avial",
    title: "Kerala Sadya Avial",
    description: "The crown jewel of Kerala Sadya featuring a colorful medley of garden vegetables cooked with coarsely ground coconut, green chilies, cumin, sour curd, fresh curry leaves, and a drizzle of raw cold-pressed coconut oil.",
    prepTime: "25 Mins",
    serves: 6,
    calories: "210 kcal",
    difficulty: "Easy",
    imageUrl: "/images/avial_user.jpg",
    videoUrl: "https://www.youtube.com/embed/ArPdf_X5wKs?si=HzFe87PcfEcDsvJC",
    flavorProfile: { spicy: 2, tangy: 3, creamy: 4 },
    story: "Legend says Avial was created by Prince Bhima during exile. It remains the essential center-piece curry of the traditional Kerala Onam Sadya.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Raw Plantain (Raw Banana)", amount: "1 peeled & batoned", benefit: "Firm starchy vegetable base for avial", imageUrl: "/images/raw_banana_user.jpg" },
      { name: "Drumstick (Muringakka)", amount: "2 cut into 2-inch pieces", benefit: "Traditional aromatic Sadya vegetable", imageUrl: "/images/drumstick_user.jpg" },
      { name: "Carrot", amount: "1 sliced into batons", benefit: "Natural sweet crunch and vibrant orange hue", imageUrl: "/images/carrot_user.jpg" },
      { name: "Yardlong Beans (Achinga Payar / Long Beans)", amount: "6 cut into 2-inch pieces", benefit: "Fresh green vegetable body", imageUrl: "/images/long_beans_user.jpg" },
      { name: "Ivy Gourd (Kovakka / Tendli)", amount: "6 quartered lengthwise", benefit: "Subtle crunch and traditional Sadya flavor", imageUrl: "/images/kovakka_user.jpg" },
      { name: "Grated coconut", amount: "1.5 cups fresh", benefit: "Coarsely ground coconut paste base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Green Chilly", amount: "4 slit", benefit: "Fresh aromatic green heat", imageUrl: "/images/green_chilly.jpg" },
      { name: "Cumin seeds", amount: "1 tsp", benefit: "Aromatic ground coconut paste seasoning", imageUrl: "/images/cumin_seeds.jpg" },
      { name: "Fresh Whisked Curd (Thayir / Yogurt)", amount: "1/2 cup whisked", benefit: "Tangy rich probiotic finish", imageUrl: "/images/curd_user.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp raw", benefit: "Quintessential uncooked aroma drizzled at the end", imageUrl: "/images/coconut_oil_user.jpg" },
      { name: "Curry leaves", amount: "3 sprigs fresh", benefit: "Crushed fresh for signature Sadya aroma", imageUrl: "/images/curry_leaves.jpg" },
      { name: "Turmeric Powder (Manjal Podi)", amount: "1/2 tsp", benefit: "Subtle warm yellow tint", imageUrl: "/images/turmeric_powder_user.jpg" },
      { name: "Pure Sea Salt (Uppu)", amount: "To taste", benefit: "Essential seasoning", imageUrl: "/images/salt_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Cut all vegetables (raw banana, drumstick, carrot, long beans, kovakka) into uniform 2-inch baton strips." },
      { stepNumber: 2, text: "Cook vegetables with turmeric powder, salt, and 1/2 cup water in a closed pot on medium heat until tender but firm." },
      { stepNumber: 3, text: "Coarsely crush grated coconut, green chilies, and cumin seeds in a blender without adding water." },
      { stepNumber: 4, text: "Add the crushed coconut paste to the cooked vegetables, mix gently without breaking the veggies, and cook for 2-3 minutes on low heat." },
      { stepNumber: 5, text: "Turn off the heat, stir in whisked sour curd, drizzle raw pure coconut oil over the top, add crushed curry leaves, and cover tightly for 10 minutes before serving." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-15T05:00:00.000Z"
  }
];

const isBrowser = () => typeof window !== 'undefined';

const MASTER_INGREDIENTS_KEY = 'khf_master_ingredients_v46';
const RECIPES_KEY = 'khf_recipes_v40';

// Master Ingredients Store
export const getMasterIngredients = (): MasterIngredient[] => {
  if (!isBrowser()) return PREDEFINED_INGREDIENTS;
  const stored = localStorage.getItem(MASTER_INGREDIENTS_KEY);
  if (!stored) {
    localStorage.setItem(MASTER_INGREDIENTS_KEY, JSON.stringify(PREDEFINED_INGREDIENTS));
    return PREDEFINED_INGREDIENTS;
  }
  try {
    const list = JSON.parse(stored);
    return Array.isArray(list) && list.length > 0 ? list : PREDEFINED_INGREDIENTS;
  } catch {
    return PREDEFINED_INGREDIENTS;
  }
};

export const saveMasterIngredient = async (ingredient: MasterIngredient): Promise<MasterIngredient> => {
  const list = getMasterIngredients();
  const index = list.findIndex(i => i.id === ingredient.id);
  let updated: MasterIngredient[];
  if (index > -1) {
    updated = list.map(i => i.id === ingredient.id ? ingredient : i);
  } else {
    updated = [ingredient, ...list];
  }
  if (isBrowser()) {
    localStorage.setItem(MASTER_INGREDIENTS_KEY, JSON.stringify(updated));
    try {
      await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
      });
    } catch (err) {
      console.error('MongoDB async sync ingredient error:', err);
    }
  }
  return ingredient;
};

export const deleteMasterIngredient = async (id: string): Promise<boolean> => {
  const list = getMasterIngredients();
  const filtered = list.filter(i => i.id !== id);
  if (list.length === filtered.length) return false;
  if (isBrowser()) {
    localStorage.setItem(MASTER_INGREDIENTS_KEY, JSON.stringify(filtered));
    try {
      await fetch(`/api/ingredients/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('MongoDB async delete ingredient error:', err);
    }
  }
  return true;
};

const sanitizeRecipe = (r: Recipe): Recipe => {
  if (!r || !Array.isArray(r.ingredients)) return r;
  return {
    ...r,
    ingredients: r.ingredients
      .filter((ing) => ing && ing.name && ing.name.trim() !== "")
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
  if (!isBrowser()) return DEFAULT_RECIPES.map(sanitizeRecipe);
  const stored = localStorage.getItem(RECIPES_KEY);
  if (!stored) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(DEFAULT_RECIPES));
    return DEFAULT_RECIPES.map(sanitizeRecipe);
  }
  try {
    const list = JSON.parse(stored);
    return Array.isArray(list) && list.length > 0
      ? list.map(sanitizeRecipe)
      : DEFAULT_RECIPES.map(sanitizeRecipe);
  } catch {
    return DEFAULT_RECIPES.map(sanitizeRecipe);
  }
};

export const fetchRecipesFromDB = async (): Promise<Recipe[]> => {
  try {
    const res = await fetch('/api/recipes', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && Array.isArray(data.recipes) && data.recipes.length > 0) {
      const sanitized = data.recipes.map(sanitizeRecipe);
      if (isBrowser()) {
        localStorage.setItem(RECIPES_KEY, JSON.stringify(sanitized));
      }
      return sanitized;
    }
  } catch (err) {
    console.error('Failed to fetch recipes from DB API:', err);
  }
  return getRecipes();
};

export const fetchMasterIngredientsFromDB = async (): Promise<MasterIngredient[]> => {
  try {
    const res = await fetch('/api/ingredients', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && Array.isArray(data.ingredients) && data.ingredients.length > 0) {
      const map = new Map<string, MasterIngredient>();
      PREDEFINED_INGREDIENTS.forEach((i) => map.set(i.id, i));
      data.ingredients.forEach((i: MasterIngredient) => map.set(i.id, i));
      const result = Array.from(map.values());
      if (isBrowser()) {
        localStorage.setItem(MASTER_INGREDIENTS_KEY, JSON.stringify(result));
      }
      return result;
    }
  } catch (err) {
    console.error('Failed to fetch ingredients from DB API:', err);
  }
  return getMasterIngredients();
};

export const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getRecipeById = (id: string): Recipe | undefined => {
  const recipes = getRecipes();
  const cleanId = id.toLowerCase().trim();
  return recipes.find(
    (r) => r.id.toLowerCase() === cleanId || slugify(r.title) === cleanId
  );
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
    localStorage.setItem(RECIPES_KEY, JSON.stringify(updated));

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
    localStorage.setItem(RECIPES_KEY, JSON.stringify(filtered));
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
