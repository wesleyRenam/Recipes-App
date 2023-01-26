import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Drinks from './pages/Drinks/Drinks';
import DrinksDetails from './pages/Drinks/DrinksDetails';
import DrinksInProgress from './pages/Drinks/DrinksInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';
import MealsDetails from './pages/Meals/MealsDetails';
import MealsInProgress from './pages/Meals/MealsInProgress';
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
      <Route path="/meals/:id" component={ MealsDetails } exact />
      <Route path="/drinks/:id" component={ DrinksDetails } exact />
      <Route path="/meals/:id/in-progress" component={ MealsInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
    </Switch>
  );
}

export default App;
