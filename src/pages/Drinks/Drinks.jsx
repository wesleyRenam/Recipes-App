import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import { RecipesContext } from '../../context/RecipesProvider';

function Drinks() {
  const { drinks, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Recipes recipe={ drinks } isLoading={ isLoading } />
      <Footer />
    </div>
  );
}

export default Drinks;
