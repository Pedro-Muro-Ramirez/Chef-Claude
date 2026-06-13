import { useState, useEffect, useRef } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "../ai";

export default function Main() {
  //state to hold the list of ingredients
  const [ingredients, setIngredients] = useState([]);

  //state to hold the generated recipe
  const [recipe, setRecipe] = useState("");

  //state to track while the recipe is being generated
  const [isLoading, setIsLoading] = useState(false);

  //state to hold an error message if the recipe fails to generate
  const [error, setError] = useState("");

  //ref to the recipe section for scrolling
  const recipeSection = useRef(null);

  //effect to scroll to the recipe when it changes
  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  //function to handle adding a new ingredient
  function ingredientForm(formData) {
    const NewIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, NewIngredient]);
  }

  //function to get a recipe from Chef Claude
  async function getRecipe() {
    setIsLoading(true);
    setError("");
    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown);
    } catch {
      setError("🔥 Something burned in the kitchen — please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      {/* form to add a new ingredient */}
      <form action={ingredientForm} className="add-ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {/* render IngredientsList only if there are ingredients */}
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}

      {/* show a chef-themed message while the recipe is being generated */}
      {isLoading && (
        <p className="loading-message" aria-live="polite">
          👨‍🍳 Chef Claude is firing up the stove and cooking up a recipe...
        </p>
      )}

      {/* show a chef-themed error message if the recipe failed to generate */}
      {!isLoading && error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {/* render ClaudeRecipe only if there is a recipe and we're not loading */}
      {!isLoading && !error && recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
