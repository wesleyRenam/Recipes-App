import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesProvider';
import MealIngredients from '../../components/Recipes/MealIngredients';
import CarouselCards from '../../components/Recipes/CarouselCard';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

function MealsDetails() {
  const { setMealDetails, detailMeal, isLoading, copyMsg,
    handleClickCopy } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  useEffect(() => {
    setMealDetails(id);
  }, []);
  const favoriteBtn = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: detailMeal[0].idMeal,
      type: 'meal',
      nationality: (detailMeal[0].strArea === null
        || detailMeal[0].strArea === undefined ? '' : detailMeal[0].strArea),
      category: detailMeal[0].strCategory,
      alcoholicOrNot: (detailMeal[0].strAlcoholic === null
        || detailMeal[0].strAlcoholic === undefined ? '' : detailMeal[0].strAlcoholic),
      name: detailMeal[0].strMeal,
      image: detailMeal[0].strMealThumb,
    }]));
  };
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
        data-testid="favorite-btn"
        onClick={ () => favoriteBtn() }
      >
        <img src={ favoriteIcon } alt="favoriteIcon" />
      </button>
      <CarouselCards type={ pathname.split('/')[1] } />
      <Link to={ `/meals/${id}/in-progress` }>
        <button
          type="submit"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default MealsDetails;
