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
    detailDrink } = useContext(RecipesContext);

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

  const verifyIsDone = () => {
    const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getItems) return;

    const items = [
      ...recipes.map((recipe) => recipe.strIngredient1 || null),
      ...recipes.map((recipe) => recipe.strIngredient2 || null),
      ...recipes.map((recipe) => recipe.strIngredient3 || null),
      ...recipes.map((recipe) => recipe.strIngredient4 || null),
      ...recipes.map((recipe) => recipe.strIngredient5 || null),
      ...recipes.map((recipe) => recipe.strIngredient6 || null),
      ...recipes.map((recipe) => recipe.strIngredient7 || null),
      ...recipes.map((recipe) => recipe.strIngredient8 || null),
      ...recipes.map((recipe) => recipe.strIngredient9 || null),
      ...recipes.map((recipe) => recipe.strIngredient10 || null),
      ...recipes.map((recipe) => recipe.strIngredient11 || null),
      ...recipes.map((recipe) => recipe.strIngredient12 || null)];
    const verify = getItems[type][id] || [];
    console.log(items);
    const isDone = items.every((e) => e === verify.includes(e));
    console.log(isDone);
    return isDone;
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
            disabled={ !verifyIsDone() }
          >
            Finalizar

          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeInProgress;
