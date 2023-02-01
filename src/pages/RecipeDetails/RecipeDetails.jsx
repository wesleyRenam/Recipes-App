/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Carousel from '../../components/Carousel/Carousel';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipes } from '../../context/RecipesProvider';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function RecipeDetails() {
  const [isFav, setIsFav] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const {
    recipe,
    setRecipeDetail,
    ingredients,
    setIngredients,
    setRecipes,
  } = useRecipes();
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];
  const { isFavorite, inProgress } = useGetLocalStorage(type, id);
  const { startRecipe, setFavorite, removeFavorite } = useSetLocalStorage(type, id);

  useEffect(() => {
    if (type === 'drinks') {
      setRecipeDetail(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, type);
      setRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
      return;
    }
    if (type === 'meals') {
      setRecipeDetail(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, type);
      setRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    }
  }, []);

  useEffect(() => {
    const ingredientsValue = Object.entries(recipe)
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map(([, value]) => value);
    const measures = Object.entries(recipe)
      .filter(([key, value]) => key.includes('strMeasure') && value)
      .map(([, value]) => value);
    const saveIngredients = { ...ingredients, ingredients: ingredientsValue, measures };
    setIngredients(saveIngredients);
  }, [recipe]);

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    startRecipe();
  };

  const handleFavorite = () => {
    setFavorite();
    setIsFav(true);
  };

  const removeFav = () => {
    removeFavorite();
    setIsFav(false);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopy(!isCopy);
  };

  return (
    <div>
      <button onClick={ isFav ? removeFav : handleFavorite }>
        <img
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
          data-testid="favorite-btn"
        />
      </button>
      <button onClick={ handleShare }>
        <img src={ shareIcon } alt="botão de compartilhar" data-testid="share-btn" />
      </button>
      <RecipeCard
        ingredients={ ingredients.ingredients }
        measures={ ingredients.measures }
        key={ recipe.idDrink || recipe.idMeal }
        title={ recipe.strDrink || recipe.strMeal }
        instructions={ recipe.strInstructions }
        image={ recipe.strDrinkThumb || recipe.strMealThumb }
        categoryOrAlcoholic={ recipe.strAlcoholic || recipe.strCategory }
        video={ type === 'meals' ? recipe.strYoutube : null }
      />
      {isCopy && (
        <div>
          <span>Link copied!</span>
        </div>
      )}
      <Carousel />
      <button
        style={ { position: 'fixed', bottom: 0 } }
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default RecipeDetails;
