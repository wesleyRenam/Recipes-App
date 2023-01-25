import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import { RecipesContext } from '../../context/RecipesProvider';
import Header from '../../components/Header/Header';

function Meals() {
  const { meals, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Recipes recipe={ meals } isLoading={ isLoading } />
      <Footer />
      <Header />
    </div>
  );
}

export default Meals;
