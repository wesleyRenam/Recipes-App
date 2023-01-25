import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import { RecipesContext } from '../../context/RecipesProvider';

function Meals() {
  const { meals, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Recipes recipe={ meals } isLoading={ isLoading } />
      <Footer />
    </div>
  );
}

export default Meals;
