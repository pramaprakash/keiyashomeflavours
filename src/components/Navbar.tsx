"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getRecipes, Recipe } from "@/utils/recipeStore";

interface NavbarProps {
  onSearchChange?: (search: string) => void;
  searchQuery?: string;
  showSearch?: boolean;
}

export default function Navbar({ onSearchChange, searchQuery = "", showSearch = true }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Local state to make input interactive on all pages (controlled input fix)
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Hydrate all recipes for autocompletion
  useEffect(() => {
    setAllRecipes(getRecipes());

    // Listen to scroll to update header appearance
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync local search when external prop changes (e.g. URL query parsed or cleared)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Update suggestions based on local search
  useEffect(() => {
    if (localSearch.trim() === "") {
      setSuggestions([]);
      return;
    }
    const q = localSearch.toLowerCase();
    const filtered = allRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
    setSuggestions(filtered.slice(0, 5));
  }, [localSearch, allRecipes]);

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      router.push(`/?search=${encodeURIComponent(val)}`);
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    if (onSearchChange) {
      onSearchChange("");
    } else {
      router.push("/");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (recipeId: string) => {
    setIsFocused(false);
    router.push(`/recipes/${recipeId}`);
  };

  const navLinks = [
    { name: "Discover", href: "/", icon: "explore" },
  ];

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-full border bg-surface/75 backdrop-blur-xl flex items-center px-4 md:px-6 transition-all duration-500 hover:border-primary/30 ${
        isScrolled
          ? "border-primary/20 shadow-[0_12px_36px_rgba(22,52,34,0.12)] hover:shadow-[0_12px_45px_rgba(22,52,34,0.18)] h-16 top-2"
          : "border-outline-variant/30 shadow-[0_16px_48px_rgba(45,75,55,0.08)] hover:shadow-[0_16px_56px_rgba(45,75,55,0.14)] h-20 top-4"
      }`}
    >
      <div className="flex justify-between items-center w-full gap-2 md:gap-4 relative">
        {/* Left Section: Brand Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`rounded-full overflow-hidden border border-outline-variant/35 shadow-sm flex-shrink-0 bg-white flex items-center justify-center transition-all duration-300 ${
                isScrolled ? "w-9 h-9" : "w-11 h-11"
              }`}
            >
              <img
                src="/logo.jpg"
                alt="Keiya's Home Flavours Logo"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="hidden lg:block font-headline-md text-base lg:text-lg tracking-tight font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent hover:opacity-90 transition-opacity select-none drop-shadow-xs">
              KEIYA&apos;S HOME FLAVOUR&apos;S
            </h1>
          </Link>
        </div>

        {/* Center Section: Prominent Autocomplete Search Box */}
        {showSearch && (
          <div className="flex-grow flex-1 mx-2 sm:mx-4 md:mx-6 min-w-[180px] max-w-md lg:max-w-xl relative group">
            {/* Search Icon */}
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-lg pointer-events-none select-none z-10">
              search
            </span>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              placeholder="What you planned to cook today?"
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-2.5 pl-10 pr-9 text-xs sm:text-sm text-on-background focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] placeholder-outline"
            />

            {/* Clear Button */}
            {localSearch && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container-high transition-all"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-sm font-black">close</span>
              </button>
            )}

            {/* Suggestions Dropdown */}
            {isFocused && (
              <div className="absolute top-12 left-0 right-0 bg-surface/95 backdrop-blur-md rounded-2xl border border-outline-variant/40 shadow-2xl p-2 z-50 flex flex-col gap-1 max-h-72 overflow-y-auto animate-fade-in">
                {suggestions.length > 0 ? (
                  <>
                    <div className="text-[9px] font-bold text-outline uppercase tracking-wider px-3 py-1 border-b border-outline-variant/20 mb-1 select-none">
                      Recipe Suggestions
                    </div>
                    {suggestions.map((recipe) => (
                      <div
                        key={recipe.id}
                        onMouseDown={() => handleSuggestionClick(recipe.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer select-none"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-variant flex-shrink-0">
                          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs font-bold text-primary flex justify-between items-center">
                            <span>{recipe.title}</span>
                            <span className="text-[8px] font-semibold text-outline uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded">
                              {recipe.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">
                            {recipe.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : localSearch.trim() !== "" ? (
                  <div className="p-4 text-center text-xs text-outline select-none">
                    No matching recipes found
                  </div>
                ) : (
                  <>
                    <div className="text-[9px] font-bold text-outline uppercase tracking-wider px-3 py-1 border-b border-outline-variant/20 mb-1 select-none">
                      Featured Cooking Guides
                    </div>
                    {allRecipes.slice(0, 3).map((recipe) => (
                      <div
                        key={recipe.id}
                        onMouseDown={() => handleSuggestionClick(recipe.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer select-none"
                      >
                        <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 ml-1">
                          auto_awesome
                        </span>
                        <div className="text-xs font-semibold text-primary">{recipe.title}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Section: SPA Segmented Control Tab Bar */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-full border border-outline-variant/20 shadow-inner flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/admin" && pathname.startsWith("/admin"));
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.name}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-xs font-bold transition-all duration-300 select-none ${
                  isActive
                    ? "bg-primary text-on-primary shadow-md scale-[1.03] border border-primary/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
