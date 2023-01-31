import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchButton={ false } />
      <Footer />
    </div>
  );
}

export default DoneRecipes;
