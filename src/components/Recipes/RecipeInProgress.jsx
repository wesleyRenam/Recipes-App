import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Ingredient from './Ingredient';

function RecipeInProgress() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const { makeFetch, isLoading } = useFetch();

  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const fetch = async () => {
      if (history.location.pathname === `/drinks/${id}/in-progress`) {
        const data = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipes(data.drinks);
      } else {
        const data = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipes(data.meals);
      }
    };
    fetch();
  }, []);

  if (isLoading) return 'Loading....';

  return (
    <div>
      <h1>RecipeInProgress</h1>
      { recipes.map((recipe) => (
        <div key={ recipe.idMeal || recipe.idDrink }>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="foto da receita"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">

            {recipe.strMeal || recipe.strDrink}

          </p>
          <p data-testid="recipe-category">

            {recipe.strAlcoholic || recipe.strCategory}
          </p>
          <p data-testid="instructions">

            {recipe.strInstructions}
          </p>
          { recipe.strIngredient1 ? <Ingredient
            id={ recipe.strIngredient1 }
            index={ 0 }
            element={ recipe.strIngredient1 }
          /> : ''}
          { recipe.strIngredient2 ? <Ingredient
            id={ recipe.strIngredient2 }
            index={ 1 }
            element={ recipe.strIngredient2 }

          /> : ''}
          { recipe.strIngredient3 ? <Ingredient
            id={ recipe.strIngredient3 }
            index={ 2 }
            element={ recipe.strIngredient3 }
          /> : ''}
          { recipe.strIngredient4 ? <Ingredient
            id={ recipe.strIngredient4 }
            index={ 3 }
            element={ recipe.strIngredient4 }
          /> : ''}
          { recipe.strIngredient5 ? <Ingredient
            id={ recipe.strIngredient5 }
            index={ 4 }
            element={ recipe.strIngredient5 }
          /> : ''}
          { recipe.strIngredient6 ? <Ingredient
            id={ recipe.strIngredient6 }
            index={ 7 }
            element={ recipe.strIngredient6 }
          /> : ''}
          { recipe.strIngredient7 ? <Ingredient
            id={ recipe.strIngredient7 }
            index={ 8 }
            element={ recipe.strIngredient7 }
          /> : ''}
          { recipe.strIngredient8 ? <Ingredient
            id={ recipe.strIngredient8 }
            index={ 9 }
            element={ recipe.strIngredient8 }
          /> : ''}
          { recipe.strIngredient9 ? <Ingredient
            id={ recipe.strIngredient9 }
            index={ 10 }
            element={ recipe.strIngredient9 }
          /> : ''}

          <button
            type="button"
            data-testid="share-btn"
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
