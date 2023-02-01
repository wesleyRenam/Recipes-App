import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeInProgress from './components/Recipes/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Drinks from './pages/Drinks/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/meals" exact>
        <Meals />
      </Route>
      <Route path="/drinks" exact>
        <Drinks />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/favorite-recipes">
        <FavoriteRecipes />
      </Route>
      <Route path="/done-recipes">
        <DoneRecipes />
      </Route>
      <Route path="/meals/:id" component={ RecipeDetails } exact />
      <Route path="/drinks/:id" component={ RecipeDetails } exact />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
