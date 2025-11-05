// src/ai.js
export async function getRecipeFromChefClaude(ingredientsArr) {
  const res = await fetch("/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.recipe;
}

