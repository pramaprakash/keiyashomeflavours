"use client";

import React, { useState } from "react";

interface SadyaItem {
  id: string;
  name: string;
  malayalam: string;
  category: string;
  description: string;
  icon: string;
  recipeId?: string;
}

interface OnamSadyaNavigatorProps {
  onSelectCourse: (query: string) => void;
  activeQuery?: string;
}

export default function OnamSadyaNavigator({
  onSelectCourse,
  activeQuery,
}: OnamSadyaNavigatorProps) {
  const [hoveredItem, setHoveredItem] = useState<SadyaItem | null>(null);

  const sadyaCourses: SadyaItem[] = [
    {
      id: "avial",
      name: "Avial",
      malayalam: "അവിയൽ",
      category: "Main Curry",
      description: "Crown jewel of garden vegetables in ground coconut & yogurt",
      icon: "eco",
      recipeId: "avial-curry",
    },
    {
      id: "parippu",
      name: "Parippu Curry",
      malayalam: "പരിപ്പു കറി",
      category: "First Course",
      description: "Golden roasted moong dal with coconut & pure ghee",
      icon: "rice_bowl",
      recipeId: "parippu-curry",
    },
    {
      id: "kalan",
      name: "Kurukku Kalan",
      malayalam: "കുറുക്കു കാളൻ",
      category: "Sour Curd Curry",
      description: "Yam & plantain boiled down in thick sour pepper curd",
      icon: "soup_kitchen",
      recipeId: "kurukku-kalan",
    },
    {
      id: "masala",
      name: "Masala Curry",
      malayalam: "മസാല കറി",
      category: "Spiced Curry",
      description: "Comforting potato curry in roasted coconut spices",
      icon: "skillet",
      recipeId: "masala-curry",
    },
    {
      id: "beetroot-kichadi",
      name: "Beetroot Kichadi",
      malayalam: "ബീറ്റ്‌റൂട്ട് കിച്ചടി",
      category: "Tempered Yogurt",
      description: "Crimson grated beetroot with crushed mustard & curd",
      icon: "palette",
      recipeId: "beetroot-kichadi",
    },
    {
      id: "pacha-manga",
      name: "Pacha Manga Pachadi",
      malayalam: "പച്ച മാങ്ങ പച്ചടി",
      category: "Sweet & Sour",
      description: "Raw green mango simmered in jaggery & coconut mustard",
      icon: "nutrition",
      recipeId: "pacha-manga-pachadi",
    },
    {
      id: "madhura",
      name: "Madhura Curry",
      malayalam: "മധുര കറി",
      category: "Sweet Curry",
      description: "Sweet pumpkin (Erissery) topped with toasted golden coconut",
      icon: "bakery_dining",
      recipeId: "madhura-curry",
    },
    {
      id: "elaneer",
      name: "Elaneer Payasam",
      malayalam: "ഇളനീർ പായസം",
      category: "Payasam",
      description: "Tender coconut water & fresh coconut flesh kheer",
      icon: "water_drop",
      recipeId: "elaneer-payasam",
    },
    {
      id: "vadukapuli",
      name: "Vadukapuli Achar",
      malayalam: "വടുകപ്പുളി അച്ചാർ",
      category: "Citron Pickle",
      description: "Wild giant citron lemon pickle with fiery chili & mustard",
      icon: "local_fire_department",
      recipeId: "vadukapuli-achar",
    },
    {
      id: "kaipakka",
      name: "Kaipakka Achar",
      malayalam: "കൈപ്പക്ക അച്ചാർ",
      category: "Bitter Gourd",
      description: "Crispy fried bitter gourd in tangy tamarind pickle",
      icon: "spa",
      recipeId: "kaipakka-achar",
    },
    {
      id: "inji-puli",
      name: "Inji Puli",
      malayalam: "ഇഞ്ചിപ്പുളി",
      category: "Digestif Relish",
      description: "Fried ginger, dark jaggery & tamarind digestif chutney",
      icon: "auto_awesome",
      recipeId: "inji-puli",
    },
    {
      id: "payasam",
      name: "Palada Payasam",
      malayalam: "പാലട പായസം",
      category: "Payasam",
      description: "Silky rice ada slow cooked in sweetened cardamom milk",
      icon: "cookie",
      recipeId: "palada-payasam",
    },
  ];

  return (
    <section className="w-full my-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white p-6 md:p-10 shadow-2xl border border-emerald-700/40">
        {/* Decorative Festive Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3 border border-amber-400/30">
              <span className="material-symbols-outlined text-sm">nature_people</span>
              Interactive Feast Guide
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-amber-100 tracking-tight flex items-center gap-3">
              The Grand Onam Sadya Experience
            </h3>
            <p className="text-emerald-200/80 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              Explore the traditional 26-item Kerala festival feast served on a fresh banana leaf. Click any delicacy below to jump directly to its recipe and masterclass instructions.
            </p>
          </div>

          <button
            onClick={() => onSelectCourse("")}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            View All Sadya Dishes
          </button>
        </div>

        {/* Banana Leaf Visual Feast Canvas */}
        <div className="relative z-10 bg-emerald-900/60 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-emerald-600/30 shadow-inner">
          <div className="text-center mb-4">
            <span className="text-[11px] font-black uppercase text-amber-300 tracking-widest bg-emerald-950/80 px-4 py-1 rounded-full border border-amber-500/20">
              🍃 Fresh Plantain Leaf Serving Layout
            </span>
          </div>

          {/* Interactive Course Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
            {sadyaCourses.map((item) => {
              const isActive = activeQuery?.toLowerCase() === item.name.toLowerCase() || activeQuery?.toLowerCase() === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectCourse(item.name)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? "bg-gradient-to-br from-amber-400/30 to-emerald-500/30 border-amber-300 shadow-lg scale-102"
                      : "bg-emerald-950/50 hover:bg-emerald-800/60 border-emerald-700/40 hover:border-amber-400/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="material-symbols-outlined text-2xl text-amber-300 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-bold text-amber-200/60 bg-emerald-900/80 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-emerald-300/80 font-medium">{item.malayalam}</div>
                    <h4 className="text-sm font-extrabold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-emerald-200/90 group-hover:text-amber-200">
                    <span>View Recipe</span>
                    <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Hover/Status Info Bar */}
          <div className="mt-5 p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-base">info</span>
              <span className="font-medium">
                {hoveredItem ? (
                  <span>
                    <strong className="text-amber-300">{hoveredItem.name}</strong>: {hoveredItem.description}
                  </span>
                ) : (
                  "Hover or click any dish above to see traditional Sadya placement and recipes"
                )}
              </span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">
              Authentic Kerala Flavors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
