import { wait } from '@testing-library/user-event/dist/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import { renderWithRouter } from './helpers/RenderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

const mockedRecipeDataMeals = {
  meals: [
    {
      idMeal: '52874',
      strMeal: 'Beef and Mustard Pie',
      strDrinkAlternate: null,
      strCategory: 'Beef',
      strArea: 'British',
      strInstructions: 'Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you\'re ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
      strTags: 'Meat,Pie',
      strYoutube: 'https://www.youtube.com/watch?v=nMyBC9staMU',
      strIngredient1: 'Beef',
      strIngredient2: 'Plain Flour',
      strIngredient3: 'Rapeseed Oil',
      strIngredient4: 'Red Wine',
      strIngredient5: 'Beef Stock',
      strIngredient6: 'Onion',
      strIngredient7: 'Carrots',
      strIngredient8: 'Thyme',
      strIngredient9: 'Mustard',
      strIngredient10: 'Egg Yolks',
      strIngredient11: 'Puff Pastry',
      strIngredient12: 'Green Beans',
      strIngredient13: 'Butter',
      strIngredient14: 'Salt',
      strIngredient15: 'Pepper',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '1kg',
      strMeasure2: '2 tbs',
      strMeasure3: '2 tbs',
      strMeasure4: '200ml',
      strMeasure5: '400ml',
      strMeasure6: '1 finely sliced',
      strMeasure7: '2 chopped',
      strMeasure8: '3 sprigs',
      strMeasure9: '2 tbs',
      strMeasure10: '2 free-range',
      strMeasure11: '400g',
      strMeasure12: '300g',
      strMeasure13: '25g',
      strMeasure14: 'pinch',
      strMeasure15: 'pinch',
      strMeasure16: '',
      strMeasure17: '',
      strMeasure18: '',
      strMeasure19: '',
      strMeasure20: '',
      strSource: 'https://www.bbc.co.uk/food/recipes/beef_and_mustard_pie_58002',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};

const mockRecipeDataDrinks = {
  drinks: [
    {
      idDrink: '17835',
      strDrink: 'Abilene',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Highball glass',
      strInstructions: 'Pour all of the ingredients into a highball glass almost filled with ice cubes. Stir well.',
      strInstructionsES: 'Coloque todos los ingredientes en un vaso alto casi lleno de cubitos de hielo. Sacudir bien.',
      strInstructionsDE: null,
      strInstructionsFR: null,
      strInstructionsIT: 'Versare tutti gli ingredienti in un bicchiere highball riempito di cubetti di ghiaccio. Mescolare bene.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/smb2oe1582479072.jpg',
      strIngredient1: 'Dark rum',
      strIngredient2: 'Peach nectar',
      strIngredient3: 'Orange juice',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 1/2 oz ',
      strMeasure2: '2 oz ',
      strMeasure3: '3 oz ',
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'Yes',
      dateModified: '2016-04-29 09:44:25',
    },
  ],
};

describe('Renderiza as telas de detalhes e..', () => {
  test('Se a página renderiza corretamente os detalhes da receita de meal específica e testa os botões', async () => {
    renderWithRouter(
      <RecipesProvider><RecipeDetails /></RecipesProvider>,
      { initialEntries: ['/meals/52874'] },
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ data: mockedRecipeDataMeals }),
    });
    const recipeCategory = await screen.findByTestId('recipe-category');
    await wait(() => {
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeCategory).toHaveTextContent('Beef');
    }, { timeout: 4000 });
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
  });
  test('Se a página renderiza corretamente os detalhes da receita de drink específica', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ data: mockRecipeDataDrinks }),
    });
    renderWithRouter(<RecipesProvider><RecipeDetails /></RecipesProvider>, { initialEntries: ['/drinks/17835'] });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ data: mockRecipeDataDrinks }),
    });
    const recipeCategory = await screen.findByTestId('recipe-category');
    await wait(() => {
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeCategory).toHaveTextContent('CocktailAlcoholic');
    }, { timeout: 4000 });
  });
});
