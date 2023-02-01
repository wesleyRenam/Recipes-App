import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../../hooks/useFetch';
import Ingredient from './Ingredient';
import { RecipesContext } from '../../context/RecipesProvider';
import shareIcon from '../../images/shareIcon.svg';
import favWhiteIcon from '../../images/whiteHeartIcon.svg';
import favBlackIcon from '../../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const { makeFetch, isLoading } = useFetch();
  const [copied, setCopied] = useState('');
  const [isFav, setIsFav] = useState(null);

  const {
    favoritos,
    favoriteBtn,
    removeFavorite,
    setDrinkDetails,
    setMealDetails,
    detailMeal,
    detailDrink,
    isDoneAll } = useContext(RecipesContext);

  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];

  useEffect(() => {
    if (type === 'drinks') {
      setDrinkDetails(id);
      const favorite = favoritos.some((fav) => fav[id] === detailDrink.idDrink);
      setIsFav(favorite);
      return;
    }
    if (type === 'meals') {
      setMealDetails(id);
      const favorite = favoritos.some((fav) => fav[id] === detailMeal.idMeal);
      setIsFav(favorite);
    }
  }, [favoritos]);

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

  if (isLoading) return 'Carregando....';

  const handleClick = () => {
    const url = `http://localhost:3000/${type}/${id}`;
    copy(url);
    setCopied('Link copied!');
  };

  const onFinishRecipeButtonClick = () => {
    const recipeObject = {
      alcoholicOrNot: recipes[0].strAlcoholic || '',
      category: recipes[0].strCategory,
      doneDate: new Date().toISOString(),
      id: type === 'meals' ? recipes[0].idMeal : recipes[0].idDrink,
      image: type === 'meals' ? recipes[0].strMealThumb : recipes[0].strDrinkThumb,
      name: type === 'meals' ? recipes[0].strMeal : recipes[0].strDrink,
      nationality: recipes[0].strArea || '',
      tags: recipes[0].strTags ? recipes[0].strTags.split(',') : [],
      type: type === 'meals' ? 'meal' : 'drink',
    };
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
      const newDoneRecipesArray = [...doneRecipesArray, recipeObject];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArray));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeObject]));
    }
    history.push('/done-recipes');
  };

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
          <div>
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
          </div>

          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleClick }
          >
            <img src={ shareIcon } alt="shareIcon" />
            {copied}
          </button>
          <button
            type="submit"
            onClick={ () => (isFav ? removeFavorite(type)
              : favoriteBtn(type)) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFav ? favBlackIcon : favWhiteIcon }
              alt="favoriteIcon"
            />
          </button>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDoneAll }
            onClick={ onFinishRecipeButtonClick }
          >
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeInProgress;
