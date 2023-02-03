import { useHistory } from 'react-router-dom';
import { useRecipes } from '../context/RecipesProvider';
import useGetLocalStorage from './useGetLocalStorage';

function useSetLocalStorage(type, id) {
  const { setInProgress, setIsFavorite } = useGetLocalStorage(type, id);
  const { recipe } = useRecipes();

  const history = useHistory();

  const startRecipe = () => {
    const { idDrink, idMeal } = recipe;
    if (type === 'meals') {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        meals: {
          ...inProgressRecipe.meals,
          [idMeal]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/meals/${id}/in-progress`);
    } else {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        drinks: {
          ...inProgressRecipe.drinks,
          [idDrink]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const finishRecipe = () => {
    const recipeData = {
      alcoholicOrNot: recipe.strAlcoholic || '',
      category: recipe.strCategory,
      doneDate: new Date().toISOString(),
      id: type === 'meals' ? recipe.idMeal : recipe.idDrink,
      image: type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      name: type === 'meals' ? recipe.strMeal : recipe.strDrink,
      nationality: recipe.strArea || '',
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      type: type === 'meals' ? 'meal' : 'drink',
    };
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
      const newDoneRecipesArray = [...doneRecipesArray, recipeData];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArray));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeData]));
    }
    history.push('/done-recipes');
  };

  const setFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (type === 'meals') {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'meals') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };

  return {
    startRecipe, setFavorite, removeFavorite, finishRecipe,
  };
}

export default useSetLocalStorage;
