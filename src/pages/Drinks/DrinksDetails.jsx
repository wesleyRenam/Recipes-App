import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesProvider';

function DrinksDetails() {
  const { detailDrink, setDrinkDetails, isLoading } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  useEffect(() => {
    setDrinkDetails(id);
  }, []);
  if (isLoading) return 'Carregando';
  return (
    <div>
      <h1 data-testid="recipe-title">
        { detailDrink[0].strDrink }
      </h1>
      <h3 data-testid="recipe-category">
        {detailDrink[0].strCategory}
      </h3>
      <img src={ detailDrink[0].strDrinkThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="instructions">
        { detailDrink.strInstructions }
      </p>
    </div>
  );
}

export default DrinksDetails;
