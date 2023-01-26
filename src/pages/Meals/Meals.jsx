import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import { RecipesContext } from '../../context/RecipesProvider';
import Header from '../../components/Header/Header';

function Meals() {
  const { meals, categoryMeals, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Header />
      <Recipes recipe={ meals } isLoading={ isLoading } categorys={ categoryMeals } />
      <Footer />
    </div>
  );
}

export default Meals;
