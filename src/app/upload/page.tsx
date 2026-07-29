"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { addRecipe, Ingredient } from "@/utils/recipeStore";

export default function UploadPage() {
  const router = useRouter();

  // Basic info states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [serves, setServes] = useState(4);
  const [calories, setCalories] = useState("");
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>("Medium");
  const [category, setCategory] = useState<'signature' | 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack'>("lunch");
  
  // Media states
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Flavor Profile states
  const [spicy, setSpicy] = useState(2);
  const [tangy, setTangy] = useState(2);
  const [creamy, setCreamy] = useState(2);

  // Story & Chef
  const [story, setStory] = useState("");
  const [chefName, setChefName] = useState("Chef Keiya");
  const [chefRole, setChefRole] = useState("Guest Chef");
  const [chefAvatar] = useState(
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200&auto=format&fit=crop"
  );

  // Dynamic lists states
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "", benefit: "", imageUrl: "" },
  ]);
  const [steps, setSteps] = useState<string[]>([""]);

  // Form step tracker
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Handlers for ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", benefit: "", imageUrl: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updated = ingredients.map((ing, i) => {
      if (i === index) {
        return { ...ing, [field]: value };
      }
      return ing;
    });
    setIngredients(updated);
  };

  // Handlers for steps
  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = steps.map((s, i) => (i === index ? value : s));
    setSteps(updated);
  };

  // Form validation
  const validateStep = (step: number): boolean => {
    const stepErrors: string[] = [];
    if (step === 1) {
      if (!title.trim()) stepErrors.push("Title is required.");
      if (!description.trim()) stepErrors.push("Description is required.");
      if (!prepTime.trim()) stepErrors.push("Prep time is required (e.g. '20 Mins').");
      if (!calories.trim()) stepErrors.push("Calories are required (e.g. '250 kcal').");
    } else if (step === 2) {
      if (!imageUrl.trim()) stepErrors.push("Cover Photo Image URL is required.");
      if (!videoUrl.trim()) stepErrors.push("Cooking Video Embed URL is required.");
    } else if (step === 3) {
      const emptyIng = ingredients.some((ing) => !ing.name.trim() || !ing.amount.trim());
      if (emptyIng) stepErrors.push("Please fill in all ingredient names and amounts.");
      const emptyStep = steps.some((s) => !s.trim());
      if (emptyStep) stepErrors.push("Please fill in all instructions steps.");
    } else if (step === 4) {
      if (!story.trim()) stepErrors.push("Chef's Story is required.");
    }

    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
    }
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(formStep)) return;

    setIsSubmitting(true);

    try {
      const cleanIngredients = ingredients.filter((ing) => ing.name.trim() !== "");
      const cleanSteps = steps.filter((s) => s.trim() !== "");

      const defaultCover = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop";

      const newRecipe = addRecipe({
        title,
        description,
        prepTime,
        serves,
        calories,
        difficulty,
        imageUrl: imageUrl.trim() || defaultCover,
        videoUrl: videoUrl.trim(),
        flavorProfile: { spicy, tangy, creamy },
        story: story.trim() || `A delicious family dish crafted with traditional spices.`,
        chef: {
          name: chefName.trim() || "Chef Keiya",
          role: chefRole.trim() || "Guest Chef",
          avatarUrl: chefAvatar.trim() || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200&auto=format&fit=crop"
        },
        ingredients: cleanIngredients,
        steps: cleanSteps,
        category,
      });

      router.push(`/recipes/${newRecipe.id}`);
    } catch (e) {
      console.error(e);
      setErrors(["Failed to submit the recipe. Please check details and try again."]);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar showSearch={false} />

      <main className="pt-28 pb-32 max-w-4xl mx-auto px-margin-mobile md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest mb-3 font-bold">
            Creator Studio
          </span>
          <h2 className="font-headline-xl text-3xl md:text-5xl font-black text-primary">
            Upload Recipe &amp; Video
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
            Share your culinary craft and cooking masterclass with the community.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-12 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-outline-variant/30 top-1/2 -translate-y-1/2 -z-10"></div>
          <div
            className="absolute left-0 h-0.5 bg-primary top-1/2 -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: `${((formStep - 1) / 3) * 100}%` }}
          ></div>
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-300 ${
                formStep >= step
                  ? "bg-primary text-on-primary border-primary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_4px_25px_rgba(45,75,55,0.04)]">
          {errors.length > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-sm space-y-1">
              <p className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">warning</span> Please correct the following errors:
              </p>
              <ul className="list-disc pl-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP 1: Basic Info */}
          {formStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-headline-sm text-lg text-primary font-bold pb-2 border-b border-outline-variant/20">
                Step 1: General Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="e.g. Traditional Sambar"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Course Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as "signature" | "breakfast" | "lunch" | "dinner" | "dessert" | "snack")}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  >
                    <option value="signature">Signature Heritage</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-outline">
                  Short Description
                </label>
                <textarea
                  id="desc"
                  rows={3}
                  placeholder="Describe the aroma, taste, and essence of this creation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="prep" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    id="prep"
                    placeholder="e.g. 20 Mins"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="serves" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="serves"
                    min={1}
                    max={20}
                    value={serves}
                    onChange={(e) => setServes(parseInt(e.target.value) || 1)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cals" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Calories
                  </label>
                  <input
                    type="text"
                    id="cals"
                    placeholder="e.g. 240 kcal"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="diff" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Difficulty
                  </label>
                  <select
                    id="diff"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Media & Previews */}
          {formStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-headline-sm text-lg text-primary font-bold pb-2 border-b border-outline-variant/20">
                Step 2: Media &amp; Videos
              </h3>

              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-xs font-bold uppercase tracking-wider text-outline">
                  Cover Photo Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  placeholder="https://images.unsplash.com/... or a public URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="video" className="text-xs font-bold uppercase tracking-wider text-outline">
                  Cooking Video URL (YouTube embed or raw MP4 link)
                </label>
                <input
                  type="url"
                  id="video"
                  placeholder="https://www.youtube.com/watch?v=... or https://www.youtube.com/embed/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                />
              </div>

              {/* Media Live Preview */}
              {(imageUrl || videoUrl) && (
                <div className="pt-6 border-t border-outline-variant/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-3">Live Player Preview</h4>
                  <div className="w-full aspect-video rounded-xl overflow-hidden shadow border border-outline-variant/20 bg-black max-w-xl mx-auto">
                    <VideoPlayer
                      videoUrl={videoUrl || "https://www.youtube.com/embed/Z0oYj08-qP8"}
                      coverImageUrl={imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"}
                      title={title || "Recipe Title Placeholder"}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Ingredients & Instructions */}
          {formStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              {/* Ingredients */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                  <h3 className="font-headline-sm text-lg text-primary font-bold">
                    Step 3: Ingredients List
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="flex items-center gap-1 text-xs font-bold text-primary bg-primary-fixed hover:bg-secondary-container px-3 py-1.5 rounded-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 relative">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Ingredient Name (e.g. Curry Leaves)"
                          value={ing.name}
                          onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
                          className="p-2.5 border border-outline-variant/40 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary text-on-background text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Amount/Quantity (e.g. 2 sprigs)"
                          value={ing.amount}
                          onChange={(e) => handleIngredientChange(idx, "amount", e.target.value)}
                          className="p-2.5 border border-outline-variant/40 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary text-on-background text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Benefit/Note (Optional)"
                          value={ing.benefit || ""}
                          onChange={(e) => handleIngredientChange(idx, "benefit", e.target.value)}
                          className="p-2.5 border border-outline-variant/40 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary text-on-background text-sm sm:col-span-2 md:col-span-1"
                        />
                      </div>
                      
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(idx)}
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg self-end md:self-center transition-colors"
                          aria-label="Remove ingredient"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Instructions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                  <h3 className="font-headline-sm text-lg text-primary font-bold">
                    Instructions Steps
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="flex items-center gap-1 text-xs font-bold text-primary bg-primary-fixed hover:bg-secondary-container px-3 py-1.5 rounded-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Step
                  </button>
                </div>

                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 bg-surface-container-low rounded-xl border border-outline-variant/10">
                      <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-2">
                        {idx + 1}
                      </div>
                      <textarea
                        rows={2}
                        placeholder={`Describe cooking step ${idx + 1}...`}
                        value={step}
                        onChange={(e) => handleStepChange(idx, e.target.value)}
                        className="flex-grow p-2.5 border border-outline-variant/40 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary text-on-background text-sm"
                      />
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg mt-2 transition-colors"
                          aria-label="Remove step"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Story & Flavors */}
          {formStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="font-headline-sm text-lg text-primary font-bold pb-2 border-b border-outline-variant/20">
                Step 4: Story &amp; Flavor Profile
              </h3>

              {/* Flavor Profile Sliders */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-5">
                <h4 className="font-headline-sm text-sm text-primary font-bold">Adjust Flavor Strengths</h4>
                
                {/* Spicy */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-outline">
                    <span>Spicy Gauge</span>
                    <span className="text-primary font-black">{spicy} / 4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={spicy}
                    onChange={(e) => setSpicy(parseInt(e.target.value))}
                    className="h-2 w-full bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Tangy */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-outline">
                    <span>Tangy Gauge</span>
                    <span className="text-primary font-black">{tangy} / 4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={tangy}
                    onChange={(e) => setTangy(parseInt(e.target.value))}
                    className="h-2 w-full bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Creamy */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-outline">
                    <span>Creamy Gauge</span>
                    <span className="text-primary font-black">{creamy} / 4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={creamy}
                    onChange={(e) => setCreamy(parseInt(e.target.value))}
                    className="h-2 w-full bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Story */}
              <div className="flex flex-col gap-2">
                <label htmlFor="story" className="text-xs font-bold uppercase tracking-wider text-outline">
                  The Story Behind the Dish
                </label>
                <textarea
                  id="story"
                  rows={4}
                  placeholder="Share a nostalgic memory, cooking secret, or historical background of the recipe..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                />
              </div>

              {/* Guest Chef Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="chef" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Author / Chef Name
                  </label>
                  <input
                    type="text"
                    id="chef"
                    value={chefName}
                    onChange={(e) => setChefName(e.target.value)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-outline">
                    Chef Description / Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={chefRole}
                    onChange={(e) => setChefRole(e.target.value)}
                    className="p-3 border border-outline-variant/60 rounded-xl bg-surface-container-low focus:outline-none focus:border-primary text-on-background text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex justify-between gap-4">
            {formStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-outline-variant/50 hover:bg-surface-container rounded-xl text-sm font-bold text-primary active:scale-95 transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span> Back
              </button>
            ) : (
              <div></div>
            )}

            {formStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3 bg-primary text-on-primary rounded-xl text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
              >
                Continue <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-primary text-on-primary rounded-xl text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">autorenew</span> Publishing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">publish</span> Publish Recipe
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
