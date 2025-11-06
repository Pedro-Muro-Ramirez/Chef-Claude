import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "../ai"

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const [recipe, setRecipe] = useState();

  function ingredientForm(formData) {
    const NewIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, NewIngredient]);
  }

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (
    <main>
      <form action={ingredientForm} className="add-ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && <IngredientsList 
      ingredients={ingredients} 
      getRecipe={getRecipe}/>}

      { recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  );
}
