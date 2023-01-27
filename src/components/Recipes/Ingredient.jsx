import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const mock = {
  drinks: {
    15997: ['Galliano'],
    17222: ['Gin', 'Grand Marnier'],
    13501: [],
  },
  meals: {
    52977: ['Lentils'],
    52978: [''],
    52785: ['Toor dal', 'Water'],
  },
};

function Ingredient(props) {
  // localStorage.setItem('inProgressRecipes', JSON.stringify(mock));

  const { id, index, element } = props;
  const [isCheck, setIsCheck] = useState(false);
  const history = useHistory();

  const type = history.location.pathname.split('/')[1];
  const numberId = history.location.pathname.split('/')[2];

  const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const validateCheck = () => {
    if (getItems[type][numberId] === undefined) {
      getItems[type][`${numberId}`] = [''];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getItems));
      return;
    }
    const isDone = getItems[type][numberId].some((e) => e === element);
    setIsCheck(isDone);
  };

  const handleChange = () => {
    const actualKey = getItems[type][numberId];
    actualKey.push(...actualKey, element);
    console.log(element);
    console.log(actualKey);
    console.log(getItems);
    // localStorage.setItem('inProgressRecipes', JSON.stringify(actualKey));
    validateCheck();
  };

  useEffect(() => {
    validateCheck();
  }, []);

  return (
    <label
      htmlFor={ id }
      style={ { textDecoration: isCheck
        ? 'line-through solid rgb(0, 0, 0)' : '' } }
      data-testid={ `${index}-ingredient-step` }

    >
      <input
        type="checkbox"
        checked={ isCheck }
        disabled={ isCheck }
        onChange={ handleChange }
        id={ id }
      />
      {element}
    </label>
  );
}

export default Ingredient;
