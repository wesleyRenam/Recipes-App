import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesProvider';
import MealIngredients from '../../components/Recipes/MealIngredients';

function MealsDetails() {
  const { setMealDetails, detailMeal, isLoading } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  useEffect(() => {
    setMealDetails(id);
  }, []);
  if (isLoading) return 'Carregando';
  return (
    <div>
      <h1 data-testid="recipe-title">
        { detailMeal[0].strMeal}
      </h1>
      <h3 data-testid="recipe-category">
        {detailMeal[0].strCategory}
      </h3>
      <img src={ detailMeal[0].strMealThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="instructions">
        { detailMeal[0].strInstructions }
      </p>
      <iframe
        title="meal-video"
        data-testid="video"
        height="480"
        width="500"
        src={ detailMeal[0].strYoutube }
      />
      <MealIngredients mealIng={ detailMeal } isLoading={ isLoading } />

    </div>
  );
}

export default MealsDetails;
