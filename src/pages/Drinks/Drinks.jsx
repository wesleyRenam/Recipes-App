import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import { RecipesContext } from '../../context/RecipesProvider';
import Header from '../../components/Header/Header';

function Drinks() {
  const { drinks, categoryDrinks, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Header />
      <Recipes recipe={ drinks } categorys={ categoryDrinks } isLoading={ isLoading } />
      <Footer />
    </div>
  );
}

export default Drinks;
