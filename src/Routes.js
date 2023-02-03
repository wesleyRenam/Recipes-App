import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Drinks from './pages/Drinks/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';
import Profile from './pages/Profile/Profile';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/meals" exact component={ Meals } />
      <Route path="/drinks" exact component={ Drinks } />
      <Route path="/meals/:id" exact component={ RecipeDetails } />
      <Route path="/drinks/:id" exact component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" exact component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" exact component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
