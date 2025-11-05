import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const [recipeShown, setRecipeShown] = useState(false);

  function ingredientForm(formData) {
    const NewIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, NewIngredient]);
  }

  function showRecipe() {
    setRecipeShown(true);
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
      toggleShowRecipe={showRecipe}/>}
      { recipeShown && <ClaudeRecipe />}
    </main>
  );
}
