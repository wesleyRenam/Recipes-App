/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { MdFavorite, MdFavoriteBorder, MdShare } from 'react-icons/md';
import Button from '../../components/Button/Button';
import RecipeProgressCard from '../../components/RecipeProgressCard/RecipeProgressCard';
import { useRecipes } from '../../context/RecipesProvider';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import * as S from './style';

function RecipeInProgress() {
  const [isFav, setIsFav] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    recipe,
    setRecipeDetail,
    ingredients,
    setIngredients,
  } = useRecipes();

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];
  const { isFavorite } = useGetLocalStorage(type, id);
  const { setFavorite, removeFavorite, finishRecipe } = useSetLocalStorage(type, id);

  useEffect(() => {
    if (type === 'drinks') {
      setRecipeDetail(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, type);
      return;
    }
    if (type === 'meals') {
      setRecipeDetail(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, type);
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

  const handleFavorite = () => {
    setFavorite();
    setIsFav(true);
  };

  const removeFav = () => {
    removeFavorite();
    setIsFav(false);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setIsCopy(!isCopy);
  };

  const verifyIsFinish = (list) => {
    const allChecked = list.every(Boolean);
    setIsDone(allChecked);
  };

  return (
    <div>
      <S.ButtonsContainer>
        <Button
          handleClick={ isFav ? removeFav : handleFavorite }
          alt="botão de favoritar"
          id="favorite-btn"
          size="30px"
          color="secondary"
        >
          { isFav
            ? <MdFavorite /> : <MdFavoriteBorder />}
        </Button>
        <Button
          handleClick={ handleShare }
          alt="botão de compartilhar"
          id="share-btn"
          size="30px"
          color="secondary"
        >
          <MdShare />
        </Button>
      </S.ButtonsContainer>

      <RecipeProgressCard
        ingredients={ ingredients.ingredients }
        measures={ ingredients.measures }
        key={ recipe.idDrink || recipe.idMeal }
        title={ recipe.strDrink || recipe.strMeal }
        instructions={ recipe.strInstructions }
        image={ recipe.strDrinkThumb || recipe.strMealThumb }
        categoryOrAlcoholic={ recipe.strAlcoholic || recipe.strCategory }
        verifyIsFinish={ verifyIsFinish }
      />
      <S.ButtonContainer>
        {isCopy && (
          <div>
            <span>Link copied!</span>
          </div>
        )}
        <button
          data-testid="finish-recipe-btn"
          onClick={ () => finishRecipe() }
          disabled={ !isDone }
        >
          Done Recipe
        </button>
      </S.ButtonContainer>
    </div>
  );
}

export default RecipeInProgress;
