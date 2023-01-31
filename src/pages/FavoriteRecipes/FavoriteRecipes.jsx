import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
