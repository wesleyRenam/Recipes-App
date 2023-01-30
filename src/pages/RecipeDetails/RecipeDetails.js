import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesProvider';
import MealIngredients from '../../components/Recipes/MealIngredients';
import CarouselCards from '../../components/Recipes/CarouselCard';
import shareIcon from '../../images/shareIcon.svg';
import favWhiteIcon from '../../images/whiteHeartIcon.svg';
import favBlackIcon from '../../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { setMealDetails, isLoading, copyMsg,
    handleClickCopy, setDrinkDetails,
    favoritos, favoriteBtn, removeFavorite } = useContext(RecipesContext);
  const [recipeStatus, setRecipeStatus] = useState('Start Recipe');
  const { pathname } = useLocation();
  const recipeType = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [idDetail, setIdDetail] = useState('');
  const [strDetail, setStrDetail] = useState('');
  useEffect(() => {
    const fetchDetails = async () => {
      if (recipeType === 'meals') {
        const mealDetails = await setMealDetails(id);
        setRecipeDetail(mealDetails);
        setIdDetail('idMeal');
        setStrDetail('strMeal');
      } else {
        const drinkDetails = await setDrinkDetails(id);
        setRecipeDetail(drinkDetails);
        setIdDetail('idDrink');
        setStrDetail('strDrink');
      }
    };
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeProgress = inProgressRecipes[recipeType][id];
      if (recipeProgress) setRecipeStatus('Continue Recipe');
    }
    fetchDetails();
  }, []);
  if (isLoading) return 'Carregando';
  const favorited = !favoritos
    .some((favorite) => favorite
      .id === recipeDetail[0][idDetail]);
  return (
    <div>
      {recipeDetail.length > 0 ? (
        <div>
          <h1 data-testid="recipe-title">
            { recipeDetail[0][strDetail]}
          </h1>
          <h3 data-testid="recipe-category">
            {recipeDetail[0].strCategory}
            {recipeType === 'drinks' ? ( 
              {' '}
              recipeDetail[0].strAlcoholic 
              ): ''}
          </h3>
          <img src={ recipeDetail[0].strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="instructions">
            { recipeDetail[0].strInstructions }
          </p>
          { recipeType === 'meals' ? (
            <iframe
              title="meal-video"
              data-testid="video"
              height="480"
              width="500"
              src={ recipeDetail[0].strYoutube }
            />
          ) : ''}
          <MealIngredients mealIng={ recipeDetail } isLoading={ isLoading } />
          <button
            type="submit"
            data-testid="share-btn"
            onClick={ () => handleClickCopy(pathname) }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <p>{copyMsg}</p>
          <button
            type="submit"
            onClick={ () => (favorited ? favoriteBtn(recipeType, recipeDetail) : (
              removeFavorite(recipeType, recipeDetail))) }
          >
            <img
              data-testid="favorite-btn"
              src={ favorited ? favWhiteIcon : favBlackIcon }
              alt="favoriteIcon"
            />
          </button>
          <CarouselCards type={ recipeType } />
          <div style={ { height: '100px' } } />
          <Link to={ `/${recipeType}/${id}/in-progress` }>
            <button
              type="submit"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: '0px', right: '100px' } }
            >
              { recipeStatus }
            </button>
          </Link>
        </div>
      ) : 'Carregando'}
    </div>
  );
}

export default RecipeDetails;
