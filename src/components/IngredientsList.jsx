export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  return (
    <section>
      <div className="ingredient-text-wrapper">
        <h2 className="ingredients-header">Ingredients on hand:</h2>
        {props.ingredients.length <= 3 && (
          <p className="recipe-instructions">[Add at least 4 ingredients]</p>
        )}
      </div>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
