import React from 'react';

function RecipeInProgress() {
  const handleChange = () => {

  };

  return (
    <div>
      <h1>RecipeInProgress</h1>
      { meals.map((meal, index) => (
        <div key={ meal.idMeal }>
          <img src={ meal.strMealThumb } alt="foto meal" data-testid="recipe-photo" />
          <p data-testid="recipe-title">

            {meal.strMeal}
          </p>
          <p data-testid="recipe-category">

            {meal.strCategory}
          </p>
          <p data-testid="instructions">

            {meal.strInstructions}
          </p>
          <input
            type="checkbox"
            id="ingredientes"
            data-testid={ `${index}-ingredient-step` }
          />
          <label htmlFor="ingredientes">{meal.strIngredient1}</label>
          <br />
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleChange }
          >
            Compartilhar

          </button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
        </div>
      ))}
    </div>
  );
}

export default RecipeInProgress;
