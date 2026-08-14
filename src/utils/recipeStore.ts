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
    videoUrl: "https://www.youtube.com/embed/5r-zZ5v9X0c",
    flavorProfile: { spicy: 2, tangy: 1, creamy: 5 },
    story: "The iconic first course of the authentic Kerala Onam Sadya, poured hot over steaming Matta rice with a splash of pure ghee.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Pigeon Pea / Moong Dal", amount: "1 cup roasted", benefit: "Protein-rich golden lentil foundation", imageUrl: "/images/pigeon_pea_user.jpg" },
      { name: "Coconut Milk (1st & 2nd Extract)", amount: "2 cups fresh", benefit: "Rich creamy coconut consistency", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Shallots & Garlic", amount: "6 shallots, 4 cloves", benefit: "Lightly golden sautéed aromatics", imageUrl: "/images/shallots_user.jpg" },
      { name: "Green Chilies & Ginger", amount: "3 chilies, 1 inch ginger", benefit: "Fresh zesty heat cooked with dal", imageUrl: "/images/ginger_user_root.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp", benefit: "Traditional Kerala sautéing oil", imageUrl: "/images/coconut_oil_user.jpg" },
      { name: "Curry Leaves & Dried Red Chilies", amount: "2 sprigs, 2 whole", benefit: "Signature Sadya tempering aroma", imageUrl: "/images/curry_leaves.jpg" },
      { name: "Turmeric, Cumin & Sea Salt", amount: "1/2 tsp turmeric, 1 tsp cumin", benefit: "Golden hue & essential spice seasoning", imageUrl: "/images/turmeric_powder_user.jpg" }
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
    id: "avial-curry",
    title: "Traditional Kerala Avial",
    description: "The crown jewel of Onam Sadya featuring garden vegetables simmered in coarsely ground coconut, green chilies, cumin, yogurt, and coconut oil.",
    prepTime: "30 Mins",
    serves: 8,
    calories: "210 kcal",
    difficulty: "Medium",
    imageUrl: "/images/ash_gourd_user.jpg",
    videoUrl: "https://www.youtube.com/embed/6XvU9l13_wM",
    flavorProfile: { spicy: 2, tangy: 3, creamy: 4 },
    story: "A harmonious medley of native vegetables created by Prince Bhima, celebrated across Kerala for its fresh coconut aroma.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Raw Banana & Drumstick", amount: "1 cup batons", benefit: "Traditional vegetable medley base", imageUrl: "/images/raw_banana_user.jpg" },
      { name: "Elephant Foot Yam (Chenai)", amount: "1 cup batons", benefit: "Earthy root vegetable texture", imageUrl: "/images/yam_user.jpg" },
      { name: "Grated Coconut", amount: "1.5 cups ground coarse", benefit: "Aromatic thick coconut paste", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Pure Coconut Oil (Velichenna)", amount: "2 tbsp drizzle", benefit: "Cold-pressed finishing aroma", imageUrl: "/images/coconut_oil.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Cook baton-cut raw banana, drumstick, yam, and carrots with turmeric, red chili powder, green chilies, and salt in minimal water." },
      { stepNumber: 2, text: "Coarsely grind fresh coconut, cumin seeds, and green chilies; fold into cooked vegetables." },
      { stepNumber: 3, text: "Turn off heat, stir in thick whisked yogurt, fresh curry leaves, and a generous drizzle of raw virgin coconut oil." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:00:00.000Z"
  },
  {
    id: "kalan-curry",
    title: "Kurukku Kalan (Yam & Plantain Sour Curd)",
    description: "Thick, slow-cooked sour curd curry made with raw plantain, yam, freshly cracked black pepper, and toasted coconut paste.",
    prepTime: "35 Mins",
    serves: 6,
    calories: "195 kcal",
    difficulty: "Medium",
    imageUrl: "/images/yam_user.jpg",
    videoUrl: "https://www.youtube.com/embed/3c_vU-0fR90",
    flavorProfile: { spicy: 3, tangy: 5, creamy: 3 },
    story: "A long-lasting Sadya delicacy known for its signature sour pepper flavor, traditionally prepared days in advance.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Elephant Foot Yam & Plantain", amount: "2 cups cubed", benefit: "Sturdy vegetable core", imageUrl: "/images/yam_user.jpg" },
      { name: "Thick Sour Curd", amount: "2 cups beaten", benefit: "Rich tangy fermented base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Black Pepper Powder (Kurumulaku)", amount: "1 tbsp freshly cracked", benefit: "Sharp warming pepper note", imageUrl: "/images/black_pepper_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Boil cubed yam and raw plantain with black pepper powder, turmeric, and salt until soft." },
      { stepNumber: 2, text: "Pour in beaten sour curd and reduce on low heat until water evaporates and curry thickens." },
      { stepNumber: 3, text: "Fold in fine ground coconut-cumin paste, simmer 3 minutes, and temper with mustard, fenugreek, and curry leaves in coconut oil." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:05:00.000Z"
  },
  {
    id: "masala-curry",
    title: "Kerala Sadya Masala Curry",
    description: "Comforting potato and vegetable curry cooked in roasted coconut spice gravy with aromatic cinnamon, cloves, and curry leaves.",
    prepTime: "25 Mins",
    serves: 6,
    calories: "220 kcal",
    difficulty: "Easy",
    imageUrl: "/images/tomato_user.jpg",
    videoUrl: "https://www.youtube.com/embed/S43yzoWdtIM",
    flavorProfile: { spicy: 4, tangy: 2, creamy: 3 },
    story: "A favorite side dish served alongside rice or poori, packed with roasted South Indian spice aromas.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Boiled Potatoes & Shallots", amount: "2 cups diced", benefit: "Hearty vegetable base", imageUrl: "/images/shallots_user.jpg" },
      { name: "Roasted Spice Paste", amount: "3 tbsp ground", benefit: "Coriander, chili & fennel blend", imageUrl: "/images/garam_masala_user.jpg" },
      { name: "Curry Leaves & Mustard", amount: "1 tbsp for tempering", benefit: "Aromatic temper note", imageUrl: "/images/curry_leaves.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Sauté sliced shallots, ginger, garlic, and green chilies in coconut oil until golden." },
      { stepNumber: 2, text: "Add roasted coriander powder, red chili powder, and Kerala garam masala; toss in boiled potato cubes." },
      { stepNumber: 3, text: "Add water, simmer until gravy thickens, and finish with coconut milk and fresh curry leaves." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:10:00.000Z"
  },
  {
    id: "beetroot-kichadi",
    title: "Beetroot Kichadi",
    description: "Vibrant crimson grated beetroot tempered with cracked mustard seeds, green chilies, ground coconut, and cool creamy curd.",
    prepTime: "15 Mins",
    serves: 6,
    calories: "140 kcal",
    difficulty: "Easy",
    imageUrl: "/images/beetroot_user.jpg",
    videoUrl: "https://www.youtube.com/embed/3c_vU-0fR90",
    flavorProfile: { spicy: 2, tangy: 4, creamy: 4 },
    story: "Adds a stunning pop of color and refreshing cooling taste to contrast spicy Sadya curries.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Organic Beetroots", amount: "2 medium grated", benefit: "Earthy natural sweetness & crimson color", imageUrl: "/images/beetroot_user.jpg" },
      { name: "Fresh Mustard & Coconut", amount: "1/2 cup ground paste", benefit: "Pungent coconut mustard base", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Thick Whisked Curd", amount: "1 cup", benefit: "Creamy cooling balance", imageUrl: "/images/grated_coconut.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Cook grated beetroot with green chilies, splash of water, and salt until tender." },
      { stepNumber: 2, text: "Grind coconut with mustard seeds into smooth paste; mix into beetroot and warm gently." },
      { stepNumber: 3, text: "Remove from heat, blend in thick beaten curd, and temper with mustard seeds and curry leaves." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:15:00.000Z"
  },
  {
    id: "pacha-manga-pachadi",
    title: "Pacha Manga Pachadi",
    description: "Tangy sweet green raw mango curry simmered in jaggery syrup, finished with mustard-infused coconut paste.",
    prepTime: "20 Mins",
    serves: 6,
    calories: "160 kcal",
    difficulty: "Easy",
    imageUrl: "/images/tamarind_user.jpg",
    videoUrl: "https://www.youtube.com/embed/5r-zZ5v9X0c",
    flavorProfile: { spicy: 2, tangy: 5, creamy: 3 },
    story: "Celebrates the irresistible combination of raw mango tartness, dark sugarcane jaggery, and cracked mustard seeds.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Raw Green Mango", amount: "1 cup chopped with skin", benefit: "Crisp sour fruit base", imageUrl: "/images/tamarind_user.jpg" },
      { name: "Organic Jaggery", amount: "1/4 cup melted", benefit: "Rich sugarcane caramel sweetness", imageUrl: "/images/jaggery_user.jpg" },
      { name: "Coconut Mustard Paste", amount: "1/2 cup ground", benefit: "Signature pachadi paste", imageUrl: "/images/grated_coconut.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Boil chopped raw mango with turmeric powder, chili powder, and salt until tender." },
      { stepNumber: 2, text: "Add melted jaggery syrup and simmer until mango absorbs sweet caramel flavors." },
      { stepNumber: 3, text: "Fold in ground coconut-mustard paste, warm 2 minutes, and finish with mustard temper in coconut oil." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:20:00.000Z"
  },
  {
    id: "madhura-curry",
    title: "Madhura Curry (Mathanga Erissery)",
    description: "Sweet yellow pumpkin simmered with roasted cowpeas in coconut paste, topped with golden crispy roasted grated coconut.",
    prepTime: "25 Mins",
    serves: 6,
    calories: "230 kcal",
    difficulty: "Medium",
    imageUrl: "/images/pineapple_user.jpg",
    videoUrl: "https://www.youtube.com/embed/6XvU9l13_wM",
    flavorProfile: { spicy: 1, tangy: 1, creamy: 5 },
    story: "A luxurious sweet and savory feast staple famous for its crunchy toasted golden coconut topping.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Sweet Yellow Pumpkin", amount: "2 cups cubed", benefit: "Naturally sweet velvety base", imageUrl: "/images/pineapple_user.jpg" },
      { name: "Grated Coconut", amount: "1 cup (half ground, half toasted)", benefit: "Rich body & golden crunch", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Pure Coconut Oil", amount: "2 tbsp for roasting", benefit: "Aromatic oil temper", imageUrl: "/images/coconut_oil.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Boil pumpkin cubes with turmeric, green chilies, and salt until soft enough to mash lightly." },
      { stepNumber: 2, text: "Grind coconut with cumin seeds into smooth paste and fold into pumpkin." },
      { stepNumber: 3, text: "In a separate pan, roast fresh grated coconut in coconut oil until deep golden brown; pour over Erissery." }
    ],
    category: "lunch",
    status: "published",
    createdDate: "2026-08-12T23:25:00.000Z"
  },
  {
    id: "elaneer-payasam",
    title: "Tender Coconut Elaneer Payasam",
    description: "Decadent dessert crafted with fresh tender coconut water, tender coconut meat, condensed milk, and cardamom powder.",
    prepTime: "15 Mins",
    serves: 6,
    calories: "260 kcal",
    difficulty: "Easy",
    imageUrl: "/images/ripe_banana_user.jpg",
    videoUrl: "https://www.youtube.com/embed/hB2F-E2P4zY",
    flavorProfile: { spicy: 0, tangy: 0, creamy: 5 },
    story: "A modern royal dessert born in coastal Malabar, highlighting pure tender coconut freshness.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Tender Coconut Meat & Water", amount: "2 cups fresh", benefit: "Hydrating refreshing tropical core", imageUrl: "/images/grated_coconut.jpg" },
      { name: "Condensed Milk & Whole Milk", amount: "1.5 cups boiled & cooled", benefit: "Creamy sweet body", imageUrl: "/images/ripe_banana_user.jpg" },
      { name: "Green Cardamom Powder", amount: "1/2 tsp ground", benefit: "Exquisite royal aroma", imageUrl: "/images/garam_masala_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Blend half of tender coconut meat into smooth purée using coconut water; chop remaining into bite-sized bits." },
      { stepNumber: 2, text: "Boil milk and condensed milk until thickened; cool completely to room temperature." },
      { stepNumber: 3, text: "Whisk coconut purée, tender coconut bits, and cardamom into chilled milk; serve ice cold." }
    ],
    category: "dessert",
    status: "published",
    createdDate: "2026-08-12T23:30:00.000Z"
  },
  {
    id: "vadukapuli-achar",
    title: "Vadukapuli Achar (Wild Citron Pickle)",
    description: "Instant fiery pickle made with wild giant citron lemon, red chili powder, roasted asafoetida, gingelly oil, and cracked mustard.",
    prepTime: "15 Mins",
    serves: 10,
    calories: "90 kcal",
    difficulty: "Easy",
    imageUrl: "/images/tamarind_user.jpg",
    videoUrl: "https://www.youtube.com/embed/5r-zZ5v9X0c",
    flavorProfile: { spicy: 5, tangy: 5, creamy: 1 },
    story: "Essential Sadya digestif pickle using large aromatic Vadukapuli citron lemons harvested for Onam.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Wild Citron Lemon (Vadukapuli)", amount: "2 cups diced small", benefit: "Intensely aromatic citrus base", imageUrl: "/images/tamarind_user.jpg" },
      { name: "Kashmiri Red Chili Powder", amount: "2 tbsp", benefit: "Vibrant red color and heat", imageUrl: "/images/red_chilly_powder_user.jpg" },
      { name: "Sesame Oil (Gingelly Oil)", amount: "3 tbsp hot oil", benefit: "Preserving oil temper note", imageUrl: "/images/coconut_oil.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Dice wild citron lemon into small bite-sized pieces and toss with sea salt; rest 10 minutes." },
      { stepNumber: 2, text: "Heat sesame oil, splutter mustard seeds, curry leaves, fenugreek powder, and asafoetida." },
      { stepNumber: 3, text: "Stir in red chili powder on low heat, pour hot aromatic oil over citron lemons, and mix thoroughly." }
    ],
    category: "snack",
    status: "published",
    createdDate: "2026-08-12T23:35:00.000Z"
  },
  {
    id: "kaipakka-achar",
    title: "Kaipakka Achar (Bitter Gourd Pickle)",
    description: "Crisp fried bitter gourd slices coated in tangy tamarind glaze, chili, fenugreek, and warm mustard oil.",
    prepTime: "20 Mins",
    serves: 10,
    calories: "110 kcal",
    difficulty: "Easy",
    imageUrl: "/images/bitter_gourd_user.jpg",
    videoUrl: "https://www.youtube.com/embed/3c_vU-0fR90",
    flavorProfile: { spicy: 4, tangy: 4, creamy: 1 },
    story: "Transforms bitter gourd into a crispy savory feast delicacy enjoyed by pickle connoisseurs.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Bitter Gourd (Pavakka)", amount: "2 cups thinly sliced", benefit: "Crispy fried savory bitterness", imageUrl: "/images/bitter_gourd_user.jpg" },
      { name: "Tamarind Extract", amount: "3 tbsp thick pulp", benefit: "Tangy balancing glaze", imageUrl: "/images/tamarind_user.jpg" },
      { name: "Asafoetida & Fenugreek", amount: "1 tsp ground", benefit: "Digestive spice blend", imageUrl: "/images/garam_masala_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Deep fry thinly sliced bitter gourd rounds in coconut oil until dark golden and crispy." },
      { stepNumber: 2, text: "Prepare pickle gravy by heating oil, spluttering mustard, chili powder, and tamarind pulp." },
      { stepNumber: 3, text: "Toss fried bitter gourd into warm pickle gravy until every slice is coated." }
    ],
    category: "snack",
    status: "published",
    createdDate: "2026-08-12T23:40:00.000Z"
  },
  {
    id: "inji-puli",
    title: "Tangy Inji Puli (Ginger Tamarind Relish)",
    description: "Dark mahogany digestif relish cooked with fried ginger, dark sugarcane jaggery, thick tamarind pulp, and green chilies.",
    prepTime: "25 Mins",
    serves: 12,
    calories: "120 kcal",
    difficulty: "Easy",
    imageUrl: "/images/ginger_user_root.jpg",
    videoUrl: "https://www.youtube.com/embed/5r-zZ5v9X0c",
    flavorProfile: { spicy: 4, tangy: 5, creamy: 1 },
    story: "Equal to 100 curries in Kerala lore, Inji Puli is the indispensable digestif placed first on the banana leaf.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Fresh Ginger Root", amount: "1 cup finely chopped", benefit: "Crispy fried digestive heat", imageUrl: "/images/ginger_user_root.jpg" },
      { name: "Dark Sugarcane Jaggery", amount: "1/2 cup melted", benefit: "Rich caramel sweetness balance", imageUrl: "/images/jaggery_user.jpg" },
      { name: "Thick Tamarind Water", amount: "1 cup extract", benefit: "Deep dark tartness", imageUrl: "/images/tamarind_user.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Fry finely chopped ginger and green chilies in coconut oil until golden brown and aromatic." },
      { stepNumber: 2, text: "Add thick tamarind extract, turmeric, red chili powder, and salt; boil until raw tamarind smell disappears." },
      { stepNumber: 3, text: "Melt in dark jaggery syrup and simmer until relish thickens to a glossy mahogany jam." }
    ],
    category: "snack",
    status: "published",
    createdDate: "2026-08-12T23:45:00.000Z"
  },
  {
    id: "palada-payasam",
    title: "Tender Palada Payasam",
    description: "Slow-simmered pink rice ada payasam cooked in rich sweetened milk, flavored with green cardamom and ghee-roasted cashews.",
    prepTime: "40 Mins",
    serves: 8,
    calories: "280 kcal",
    difficulty: "Medium",
    imageUrl: "/images/ripe_banana_user.jpg",
    videoUrl: "https://www.youtube.com/embed/hB2F-E2P4zY",
    flavorProfile: { spicy: 0, tangy: 0, creamy: 5 },
    story: "The grandeur finale of the Onam Sadya, slow cooked in heavy brass Uruli until milk caramelizes into a pink hue.",
    chef: {
      name: "Chef Keiya",
      role: "Executive Chef & Founder",
      avatarUrl: "/images/chef_keiya_avatar.jpg"
    },
    ingredients: [
      { name: "Steamed Rice Ada", amount: "1 cup cooked", benefit: "Soft delicate rice flakes", imageUrl: "/images/pigeon_pea_user.jpg" },
      { name: "Whole Full Cream Milk", amount: "1.5 liters", benefit: "Caramelized creamy base", imageUrl: "/images/ripe_banana_user.jpg" },
      { name: "Pure Ghee & Cashews", amount: "2 tbsp ghee", benefit: "Rich crunchy topping", imageUrl: "/images/coconut_oil.jpg" }
    ],
    steps: [
      { stepNumber: 1, text: "Wash and drain rice ada; cook in boiling water until soft and rinse in cold water." },
      { stepNumber: 2, text: "Boil milk and sugar in a wide heavy-bottom pan, reducing on low flame until milk turns light pink." },
      { stepNumber: 3, text: "Add cooked rice ada, simmer 10 minutes, and garnish with cardamom and ghee-roasted cashews." }
    ],
    category: "dessert",
    status: "published",
    createdDate: "2026-08-12T23:50:00.000Z"
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
  if (!isBrowser()) return DEFAULT_RECIPES.map(sanitizeRecipe);
  const stored = localStorage.getItem('khf_recipes_v40');
  if (!stored) {
    localStorage.setItem('khf_recipes_v40', JSON.stringify(DEFAULT_RECIPES));
    return DEFAULT_RECIPES.map(sanitizeRecipe);
  }
  try {
    const list = JSON.parse(stored);
    const validIds = new Set(DEFAULT_RECIPES.map(r => r.id));
    const filtered = Array.isArray(list) ? list.filter(r => validIds.has(r.id)) : [];
    const result = filtered.length > 0 ? filtered : DEFAULT_RECIPES;
    return result.map(sanitizeRecipe);
  } catch {
    return DEFAULT_RECIPES.map(sanitizeRecipe);
  }
};

export const fetchRecipesFromDB = async (): Promise<Recipe[]> => {
  try {
    const res = await fetch('/api/recipes', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && Array.isArray(data.recipes) && data.recipes.length > 0) {
      const validIds = new Set(DEFAULT_RECIPES.map(r => r.id));
      const filtered = data.recipes.filter((r: Recipe) => validIds.has(r.id));
      const sanitized = (filtered.length > 0 ? filtered : DEFAULT_RECIPES).map(sanitizeRecipe);
      if (isBrowser()) {
        localStorage.setItem('khf_recipes_v40', JSON.stringify(sanitized));
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
