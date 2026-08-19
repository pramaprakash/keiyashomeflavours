"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  MasterIngredient,
  getMasterIngredients,
  saveMasterIngredient,
} from "@/utils/recipeStore";

export default function AdminAddIngredientPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("");
  const [category, setCategory] = useState("Produce");
  const [benefit, setBenefit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
  }, [router]);

  // Handle local image file upload & object URL preview
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Upload immediately via /api/upload
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url) {
            setImagePreview(data.url);
            setImageUrl(data.url);
            return;
          }
        }
      } catch (err) {
        console.error("API upload error, using local FileReader fallback:", err);
      }

      // Fallback: FileReader Base64
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Ingredient name is required.");
      return;
    }

    let finalImage = imagePreview || imageUrl.trim();

    if (!finalImage && imageFile) {
      // Try upload before submitting
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          finalImage = data.url;
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!finalImage) {
      setErrorMsg("Please upload an image file or provide an image URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newIngredient: MasterIngredient = {
        id: `ing-${Date.now()}`,
        name: name.trim(),
        defaultAmount: defaultAmount.trim() || "1 portion",
        category: category.trim() || "General",
        benefit: benefit.trim(),
        imageUrl: finalImage,
      };

      await saveMasterIngredient(newIngredient);
      setIsSubmitting(false);
      setSuccessMsg(`"${name}" successfully saved to Predefined Master Library!`);

      // Reset Form
      setName("");
      setDefaultAmount("");
      setBenefit("");
      setImageUrl("");
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save ingredient. Please try again.");
      setIsSubmitting(false);
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

      <main className="pt-28 pb-32 max-w-3xl mx-auto px-margin-mobile md:px-6">
        {/* Top Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest mb-2 font-bold">
              Admin Dashboard Feature
            </span>
            <h2 className="font-headline-xl text-2xl md:text-4xl font-black text-primary">
              Add New Predefined Ingredient
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Upload an ingredient photo and set defaults for instant selection in recipe creation.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-1 text-xs font-bold border border-outline-variant/60 px-4 py-2 rounded-xl hover:bg-surface-container transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Dashboard
          </button>
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container border border-error/30 font-bold text-xs flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-lg">warning</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Dedicated Ingredient Submission Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-[0_10px_35px_rgba(22,52,34,0.06)] space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ing-name" className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
                Ingredient Name *
              </label>
              <input
                id="ing-name"
                type="text"
                required
                placeholder="e.g. Fresh Curry Leaves"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-sm font-medium text-primary"
              />
            </div>

            <div>
              <label htmlFor="ing-amount" className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
                Default Quantity / Portion
              </label>
              <input
                id="ing-amount"
                type="text"
                placeholder="e.g. 2 sprigs / 1 tsp"
                value={defaultAmount}
                onChange={(e) => setDefaultAmount(e.target.value)}
                className="w-full p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-sm font-medium text-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ing-cat" className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
              Category
            </label>
            <select
              id="ing-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-sm font-medium text-primary"
            >
              <option value="Produce">Produce / Vegetables</option>
              <option value="Spices">Spices &amp; Seasonings</option>
              <option value="Herbs">Herbs &amp; Fresh Aromatics</option>
              <option value="Dairy">Dairy &amp; Oils</option>
              <option value="Grains">Grains &amp; Pulses</option>
              <option value="Pantry">Pantry Essentials</option>
            </select>
          </div>

          {/* Image Upload Box */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-outline">
              Ingredient Image Upload *
            </label>

            {/* File Upload Zone */}
            <div className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-6 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors relative cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform">
                  cloud_upload
                </span>
                <p className="text-xs font-bold text-primary">
                  Click or drag ingredient photo to upload
                </p>
                <p className="text-[10px] text-outline">
                  Supports JPG, PNG, WEBP images
                </p>
              </div>
            </div>

            {/* Alternative URL Input */}
            <div className="flex items-center gap-3 my-2">
              <div className="h-px bg-outline-variant/30 flex-1"></div>
              <span className="text-[10px] font-bold uppercase text-outline">or provide image URL</span>
              <div className="h-px bg-outline-variant/30 flex-1"></div>
            </div>

            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-xs font-medium text-primary"
            />

            {/* Image Preview Window */}
            {(imagePreview || imageUrl) && (
              <div className="mt-4 p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-variant flex-shrink-0 border border-outline-variant/20">
                  <img
                    src={imagePreview || imageUrl}
                    alt="Ingredient Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                    Image Selected
                  </span>
                  <p className="text-xs font-bold text-primary mt-1 line-clamp-1">
                    {imageFile ? imageFile.name : "Image URL configured"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="ing-benefit" className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
              Health Benefit / Culinary Note
            </label>
            <textarea
              id="ing-benefit"
              rows={3}
              placeholder="e.g. Rich in antioxidants and adds traditional tempering aroma."
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              className="w-full p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-xs font-medium text-primary leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="px-5 py-3 rounded-xl text-xs font-bold border border-outline-variant/60 hover:bg-surface-container transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl text-xs font-bold bg-primary text-on-primary shadow-md hover:shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">autorenew</span>
                  Saving Ingredient...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>Submit &amp; Save Ingredient</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
