import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CarouselCards from '../../components/Recipes/CarouselCard';
import MealIngredients from '../../components/Recipes/MealIngredients';
import { RecipesContext } from '../../context/RecipesProvider';
import shareIcon from '../../images/shareIcon.svg';
import favWhiteIcon from '../../images/whiteHeartIcon.svg';
import favBlackIcon from '../../images/blackHeartIcon.svg';

function DrinksDetails() {
  const { detailDrink, setDrinkDetails, isLoading, copyMsg,
    handleClickCopy,
    favoritos, favoriteBtn, removeFavorite } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  useEffect(() => {
    setDrinkDetails(id);
  }, []);
  if (isLoading) return 'Carregando';
  const favorited = !favoritos
    .some((favorite) => favorite
      .id === detailDrink[0].idDrink);
  return (
    <div>
      <h1 data-testid="recipe-title">
        { detailDrink[0].strDrink }
      </h1>
      <h3 data-testid="recipe-category">
        {detailDrink[0].strCategory}
        {detailDrink[0].strAlcoholic}
      </h3>
      <img src={ detailDrink[0].strDrinkThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="instructions">
        { detailDrink[0].strInstructions }
      </p>
      <MealIngredients mealIng={ detailDrink } isLoading={ isLoading } />
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
        onClick={ () => (favorited ? favoriteBtn(pathname
          .split('/')[1]) : removeFavorite(pathname.split('/')[1])) }
      >
        <img
          data-testid="favorite-btn"
          src={ favorited ? favWhiteIcon : favBlackIcon }
          alt="favoriteIcon"
        />
      </button>
      <CarouselCards type={ pathname.split('/')[1] } />
      <Link to={ `/drinks/${id}/in-progress` }>
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

export default DrinksDetails;
