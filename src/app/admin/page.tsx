"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getRecipes,
  fetchRecipesFromDB,
  fetchMasterIngredientsFromDB,
  deleteRecipe,
  saveRecipe,
  Recipe,
  MasterIngredient,
  getMasterIngredients,
  saveMasterIngredient,
  deleteMasterIngredient,
} from "@/utils/recipeStore";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"recipes" | "ingredients">("recipes");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [masterIngredients, setMasterIngredients] = useState<MasterIngredient[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Recipe edit modal state
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Master Ingredient edit modal state
  const [editingMasterIng, setEditingMasterIng] = useState<MasterIngredient | null>(null);

  const loadData = async () => {
    // Fast initial load from cache
    setRecipes(getRecipes());
    setMasterIngredients(getMasterIngredients());

    // Fetch latest fresh data from MongoDB Cloud
    const freshRecipes = await fetchRecipesFromDB();
    if (freshRecipes && freshRecipes.length > 0) setRecipes(freshRecipes);

    const freshIngredients = await fetchMasterIngredientsFromDB();
    if (freshIngredients && freshIngredients.length > 0) setMasterIngredients(freshIngredients);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("khf_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }
    loadData();
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("khf_admin_auth");
      localStorage.removeItem("khf_admin_user");
    }
    router.push("/admin/login");
  };

  // Helper to handle image file upload via /api/upload with base64 fallback
  const uploadImageFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        return data.url;
      }
    } catch (err) {
      console.error("Upload API failed, using base64 fallback:", err);
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  // Recipe actions
  const handleCreateNewRecipe = () => {
    const newBlankRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
      title: "",
      description: "",
      prepTime: "20 Mins",
      serves: 4,
      calories: "250 kcal",
      difficulty: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/3c_vU-0fR90",
      flavorProfile: { spicy: 2, tangy: 2, creamy: 3 },
      story: "",
      chef: {
        name: "Chef Keiya",
        role: "Executive Chef & Founder",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgch980p1hgbKKyIF6wMr4pWW0TkQS59r2C0FRS2YarKAAGn2UD4zHpYsf7ovaDsX5N0xDyIPUFC98HxY17uv0fr0aQ9mNArNSyoVTBkJtlWUgvVA7pLuQjTLTgmwlliKcTG3aCwDRkqcVsEE2L2cS650TRf2qPJd0MQN7kZLm1yCDDwT7WnF8XzvBzOKhrTVeF-7fCoVfejePXIKvxLDfMHiI2LPM-OqnHCK7cN5GC8S7FVmVf0a7",
      },
      ingredients: [],
      steps: [{ stepNumber: 1, text: "", timestampSeconds: 0 }],
      category: "signature",
      status: "draft",
      createdDate: new Date().toISOString(),
    };
    setEditingRecipe(newBlankRecipe);
  };

  const handleDeleteRecipe = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(id);
      loadData();
      if (editingRecipe?.id === id) setEditingRecipe(null);
    }
  };

  // Toggle publish status directly from list view
  const handleTogglePublishStatus = async (recipeToToggle: Recipe) => {
    const newStatus = recipeToToggle.status === "published" ? "draft" : "published";
    const updated = { ...recipeToToggle, status: newStatus as "draft" | "published" };
    await saveRecipe(updated);
    loadData();
    alert(
      newStatus === "published"
        ? `"${updated.title}" has been Published and is now live on the Home Page!`
        : `"${updated.title}" changed to Draft (hidden from Home Page).`
    );
  };

  const handleSaveRecipe = async (targetStatus: "draft" | "published" = "published") => {
    if (editingRecipe) {
      if (!editingRecipe.title.trim()) {
        alert("Please enter a recipe title.");
        return;
      }
      await saveRecipe({ ...editingRecipe, status: targetStatus });
      loadData();
      setEditingRecipe(null);
      alert(
        targetStatus === "published"
          ? `Recipe "${editingRecipe.title}" published successfully! It is now live on the Home Page and saved in MongoDB.`
          : `Recipe "${editingRecipe.title}" saved as a Draft in MongoDB.`
      );
    }
  };

  // Select predefined ingredient into recipe
  const handleSelectPredefinedIngredient = (master: MasterIngredient) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: [
        ...editingRecipe.ingredients,
        {
          name: master.name,
          amount: master.defaultAmount || "1 portion",
          benefit: master.benefit || "",
          imageUrl: master.imageUrl || "",
        },
      ],
    });
  };

  const handleAddCustomIngredient = () => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: [
        ...editingRecipe.ingredients,
        { name: "", amount: "", benefit: "", imageUrl: "" },
      ],
    });
  };

  const handleRemoveIngredient = (idx: number) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: editingRecipe.ingredients.filter((_, i) => i !== idx),
    });
  };

  // Recipe Step Actions
  const handleAddStep = () => {
    if (!editingRecipe) return;
    const nextNum = editingRecipe.steps.length + 1;
    setEditingRecipe({
      ...editingRecipe,
      steps: [...editingRecipe.steps, { stepNumber: nextNum, text: "", timestampSeconds: 0 }],
    });
  };

  const handleRemoveStep = (idx: number) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      steps: editingRecipe.steps.filter((_, i) => i !== idx),
    });
  };

  // Master Ingredient Library Actions
  const handleDeleteMasterIng = (id: string) => {
    if (confirm("Are you sure you want to delete this predefined ingredient from the library?")) {
      deleteMasterIngredient(id);
      loadData();
      if (editingMasterIng?.id === id) setEditingMasterIng(null);
    }
  };

  const handleSaveMasterIng = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMasterIng) {
      if (!editingMasterIng.name.trim()) {
        alert("Please enter ingredient name.");
        return;
      }
      saveMasterIngredient(editingMasterIng);
      loadData();
      setEditingMasterIng(null);
      alert("Ingredient saved to Master Library & MongoDB!");
    }
  };

  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined animate-spin">autorenew</span>
          <span>Redirecting to Admin Login...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar showSearch={false} />

      <main className="pt-28 pb-32 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-[10px] font-black uppercase tracking-wider">
                Admin Control Active
              </span>
            </div>
            <h2 className="font-headline-xl text-3xl md:text-4xl font-black text-primary">
              Admin Studio &amp; Ingredient Library
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/ingredients/add"
              className="bg-secondary-container text-on-secondary-container px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">cloud_upload</span>
              Add Ingredient &amp; Image
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-error bg-error-container/20 px-4 py-2.5 rounded-xl hover:bg-error-container/40 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span> Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "recipes"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            Manage Recipes ({recipes.length})
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "ingredients"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-base">grocery</span>
            Predefined Ingredients Library ({masterIngredients.length})
          </button>
        </div>

        {/* TAB 1: Recipe Management */}
        {activeTab === "recipes" && (
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-outline-variant/20 pb-4">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-primary">
                  Recipe Directory
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Create recipes as drafts or publish them directly onto the visitor home page.
                </p>
              </div>
              <button
                onClick={handleCreateNewRecipe}
                className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add New Recipe
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipes.map((r) => {
                const isPublished = r.status === "published" || !r.status;
                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 gap-4 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-variant flex-shrink-0 border border-outline-variant/30 relative">
                        <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-primary truncate">{r.title}</h4>
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              isPublished
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-amber-100 text-amber-900 border border-amber-300"
                            }`}
                          >
                            {isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                          {r.category.toUpperCase()} • {r.prepTime} • Serves {r.serves}
                        </p>
                        <p className="text-[10px] text-outline mt-0.5">
                          {r.ingredients.length} Ingredients • {r.steps.length} Steps
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Publish / Unpublish Toggle */}
                      <button
                        onClick={() => handleTogglePublishStatus(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isPublished
                            ? "bg-emerald-700 text-white hover:bg-emerald-800"
                            : "bg-primary text-on-primary hover:opacity-90"
                        }`}
                        title={isPublished ? "Click to change to Draft" : "Click to Publish to Home Page"}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isPublished ? "check_circle" : "publish"}
                        </span>
                        {isPublished ? "Published" : "Publish"}
                      </button>

                      <button
                        onClick={() => setEditingRecipe(r)}
                        className="px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary/10 text-primary text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(r.id)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/20 transition-all cursor-pointer"
                        aria-label="Delete recipe"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Predefined Ingredients Library */}
        {activeTab === "ingredients" && (
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-outline-variant/20 pb-4">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-primary">
                  Predefined Master Ingredients &amp; Images List
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Add or edit high-quality predefined ingredient cards with images for quick selection in recipes.
                </p>
              </div>
              <Link
                href="/admin/ingredients/add"
                className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                + Upload New Ingredient &amp; Image
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {masterIngredients.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:border-primary/40 transition-all group"
                >
                  <div>
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-variant mb-3 relative border border-outline-variant/20">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.category && (
                        <span className="absolute top-2 right-2 text-[9px] font-black uppercase bg-primary text-on-primary px-2 py-0.5 rounded-full shadow">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-primary mb-1">{item.name}</h4>
                    <p className="text-[11px] text-outline line-clamp-2 leading-relaxed">
                      {item.benefit || "No description provided."}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">
                      Default: {item.defaultAmount || "1 portion"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-outline-variant/20">
                    <button
                      onClick={() => setEditingMasterIng(item)}
                      className="px-2.5 py-1 rounded bg-surface-container-high text-primary hover:bg-primary/10 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">edit</span> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMasterIng(item.id)}
                      className="p-1 text-error hover:bg-error-container/20 rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL 1: Recipe Full Details Edit Form */}
        {editingRecipe && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 border border-outline-variant/40 shadow-2xl relative animate-fade-in">
              <button
                onClick={() => setEditingRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-high text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined font-bold">close</span>
              </button>

              <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/30 pb-4">
                <span className="material-symbols-outlined text-primary text-3xl">edit_note</span>
                <div>
                  <h3 className="font-headline-lg text-xl font-bold text-primary">
                    {editingRecipe.title ? `Edit Recipe: ${editingRecipe.title}` : "Add New Recipe"}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Configure details, metrics, flavor profiles, and set publishing privilege.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Basic Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-outline border-b border-outline-variant/20 pb-1">
                    1. Header &amp; Media Links
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-outline">Recipe Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kerala Fish Curry"
                        value={editingRecipe.title}
                        onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-outline">Category</label>
                      <select
                        value={editingRecipe.category}
                        onChange={(e) =>
                          setEditingRecipe({
                            ...editingRecipe,
                            category: e.target.value as Recipe["category"],
                          })
                        }
                        className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary focus:outline-none focus:border-primary"
                      >
                        <option value="signature">Signature</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-outline">Video Stream URL</label>
                      <input
                        type="text"
                        required
                        placeholder="https://www.youtube.com/embed/..."
                        value={editingRecipe.videoUrl}
                        onChange={(e) => setEditingRecipe({ ...editingRecipe, videoUrl: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-outline">Cover Artwork Image</label>
                      <div className="flex flex-col sm:flex-row gap-2 items-stretch mt-1">
                        <input
                          type="text"
                          required
                          placeholder="https://images.unsplash.com/... or upload photo"
                          value={editingRecipe.imageUrl}
                          onChange={(e) => setEditingRecipe({ ...editingRecipe, imageUrl: e.target.value })}
                          className="flex-1 p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                        />
                        <label className="px-3 py-2 bg-primary-container text-on-primary-container hover:bg-primary-container/80 text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                          <span className="material-symbols-outlined text-sm">cloud_upload</span>
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await uploadImageFile(e.target.files[0]);
                                setEditingRecipe({ ...editingRecipe, imageUrl: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                      {editingRecipe.imageUrl && (
                        <div className="mt-2 w-full h-28 rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-variant">
                          <img src={editingRecipe.imageUrl} alt="Recipe Cover Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-outline">Description</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Brief overview of flavors and tradition..."
                      value={editingRecipe.description}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
                      className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                    />
                  </div>
                </div>

                {/* Predefined Ingredients Selector Toolbar */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-outline-variant/20 pb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-outline">
                      2. Add Ingredients from Predefined Library ({editingRecipe.ingredients.length} Selected)
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddCustomIngredient}
                      className="text-[11px] font-bold text-primary bg-primary-fixed px-3 py-1 rounded cursor-pointer"
                    >
                      + Add Custom Ingredient
                    </button>
                  </div>

                  {/* Predefined Chips Selector */}
                  <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                    <p className="text-[11px] text-outline font-bold uppercase mb-2">
                      Click to add predefined ingredient &amp; image:
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                      {masterIngredients.map((master) => (
                        <button
                          key={master.id}
                          type="button"
                          onClick={() => handleSelectPredefinedIngredient(master)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary text-xs font-bold text-primary shadow-xs hover:scale-105 transition-all cursor-pointer"
                        >
                          <img
                            src={master.imageUrl}
                            alt={master.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>+ {master.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Ingredients Table */}
                  <div className="space-y-3 mt-4">
                    {editingRecipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="p-3 border rounded-xl bg-surface-container-low space-y-2">
                        <div className="flex gap-2 items-center">
                          {ing.imageUrl && (
                            <img src={ing.imageUrl} alt={ing.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <input
                            type="text"
                            placeholder="Ingredient Name"
                            value={ing.name}
                            onChange={(e) => {
                              const newIngs = [...editingRecipe.ingredients];
                              newIngs[idx].name = e.target.value;
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                            }}
                            className="flex-1 p-2 border rounded-lg bg-surface-container-lowest text-xs font-bold text-primary"
                          />
                          <input
                            type="text"
                            placeholder="Amount (e.g. 2 cups)"
                            value={ing.amount}
                            onChange={(e) => {
                              const newIngs = [...editingRecipe.ingredients];
                              newIngs[idx].amount = e.target.value;
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                            }}
                            className="w-36 p-2 border rounded-lg bg-surface-container-lowest text-xs font-medium text-primary"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(idx)}
                            className="p-1.5 text-error hover:bg-error-container/20 rounded cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Health Benefit / Note (Optional)"
                            value={ing.benefit || ""}
                            onChange={(e) => {
                              const newIngs = [...editingRecipe.ingredients];
                              newIngs[idx].benefit = e.target.value;
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                            }}
                            className="w-full p-2 border rounded-lg bg-surface-container-lowest text-xs text-outline"
                          />
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Ingredient Image URL"
                              value={ing.imageUrl || ""}
                              onChange={(e) => {
                                const newIngs = [...editingRecipe.ingredients];
                                newIngs[idx].imageUrl = e.target.value;
                                setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                              }}
                              className="flex-1 p-2 border rounded-lg bg-surface-container-lowest text-xs text-outline"
                            />
                            <label className="px-2.5 py-1.5 bg-surface-container-high text-primary text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1 hover:bg-surface-container-highest shrink-0 transition-colors">
                              <span className="material-symbols-outlined text-xs">upload_file</span>
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const url = await uploadImageFile(e.target.files[0]);
                                    const newIngs = [...editingRecipe.ingredients];
                                    newIngs[idx].imageUrl = url;
                                    setEditingRecipe({ ...editingRecipe, ingredients: newIngs });
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cooking Steps Section */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-outline">
                      3. Cooking Instructions &amp; Timestamps ({editingRecipe.steps.length})
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="text-[11px] font-bold text-primary bg-primary-fixed px-3 py-1 rounded cursor-pointer"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingRecipe.steps.map((step, idx) => {
                      const isString = typeof step === "string";
                      const stepText = isString ? step : step.text;
                      const stepTimestamp = !isString ? step.timestampSeconds || 0 : 0;

                      return (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="w-6 text-center text-xs font-bold text-outline">{idx + 1}.</span>
                          <input
                            type="text"
                            placeholder={`Describe Step ${idx + 1}`}
                            value={stepText}
                            onChange={(e) => {
                              const newSteps = [...editingRecipe.steps];
                              if (isString) {
                                newSteps[idx] = e.target.value;
                              } else {
                                newSteps[idx] = { ...step, text: e.target.value };
                              }
                              setEditingRecipe({ ...editingRecipe, steps: newSteps });
                            }}
                            className="flex-1 p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                          />
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold text-outline">Seek Secs:</span>
                            <input
                              type="number"
                              placeholder="Secs"
                              value={stepTimestamp}
                              onChange={(e) => {
                                const newSteps = [...editingRecipe.steps];
                                const sec = parseInt(e.target.value) || 0;
                                newSteps[idx] = {
                                  stepNumber: idx + 1,
                                  text: stepText,
                                  timestampSeconds: sec,
                                };
                                setEditingRecipe({ ...editingRecipe, steps: newSteps });
                              }}
                              className="w-20 p-2.5 border rounded-lg bg-surface-container-low text-xs text-center font-bold text-primary"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(idx)}
                            className="p-1.5 text-error hover:bg-error-container/20 rounded cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer buttons with explicit Publish & Save as Draft options */}
                <div className="pt-6 border-t border-outline-variant/30 flex flex-wrap justify-between items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingRecipe(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold border border-outline-variant/60 hover:bg-surface-container cursor-pointer"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSaveRecipe("draft")}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-surface-container-high text-primary hover:bg-surface-container-highest transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">save</span>
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveRecipe("published")}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">publish</span>
                      Publish to Home Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: Predefined Master Ingredient Edit Form */}
        {editingMasterIng && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 md:p-8 border border-outline-variant/40 shadow-2xl relative animate-fade-in">
              <button
                onClick={() => setEditingMasterIng(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-high text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined font-bold">close</span>
              </button>

              <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/30 pb-4">
                <span className="material-symbols-outlined text-primary text-3xl">grocery</span>
                <div>
                  <h3 className="font-headline-lg text-lg font-bold text-primary">
                    Predefined Ingredient Editor
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Add or update ingredient names, image URLs, and default quantities in the master library.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveMasterIng} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-outline">Ingredient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Turmeric Powder"
                    value={editingMasterIng.name}
                    onChange={(e) => setEditingMasterIng({ ...editingMasterIng, name: e.target.value })}
                    className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-bold text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-outline">Default Quantity</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 tsp"
                      value={editingMasterIng.defaultAmount || ""}
                      onChange={(e) => setEditingMasterIng({ ...editingMasterIng, defaultAmount: e.target.value })}
                      className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-outline">Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Spices / Produce"
                      value={editingMasterIng.category || ""}
                      onChange={(e) => setEditingMasterIng({ ...editingMasterIng, category: e.target.value })}
                      className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-outline">Ingredient Image</label>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch mt-1">
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/... or upload photo"
                      value={editingMasterIng.imageUrl}
                      onChange={(e) => setEditingMasterIng({ ...editingMasterIng, imageUrl: e.target.value })}
                      className="flex-1 p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                    />
                    <label className="px-3 py-2 bg-primary-container text-on-primary-container hover:bg-primary-container/80 text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                      <span className="material-symbols-outlined text-sm">cloud_upload</span>
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadImageFile(e.target.files[0]);
                            setEditingMasterIng({ ...editingMasterIng, imageUrl: url });
                          }
                        }}
                      />
                    </label>
                  </div>
                  {editingMasterIng.imageUrl && (
                    <div className="mt-2 w-full h-24 rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-variant">
                      <img src={editingMasterIng.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-outline">Health Benefit / Culinary Note</label>
                  <textarea
                    rows={2}
                    placeholder="Key health benefit or aroma note..."
                    value={editingMasterIng.benefit || ""}
                    onChange={(e) => setEditingMasterIng({ ...editingMasterIng, benefit: e.target.value })}
                    className="w-full p-2.5 border rounded-lg bg-surface-container-low text-xs font-medium text-primary"
                  />
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingMasterIng(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/60 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">save</span>
                    Save to Master Library &amp; DB
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
