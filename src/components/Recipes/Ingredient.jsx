import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const initialEntry = {
  drinks: {

  },
  meals: {

  },
};

function Ingredient(props) {
  const { id, index, element } = props;
  const [isCheck, setIsCheck] = useState(false);
  const history = useHistory();

  const type = history.location.pathname.split('/')[1];
  const numberId = history.location.pathname.split('/')[2];

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getItems) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialEntry));
    }
  }, []);

  const createAndUpdateItem = (item) => {
    if (item[type][numberId] === undefined) {
      item[type][`${numberId}`] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(item));
      return;
    }
    const isDone = item[type][numberId].some((e) => e === element);
    if (isDone) return setIsCheck(isDone);
  };

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    createAndUpdateItem(getItems);
  }, []);

  const handleChange = () => {
    const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newItem = getItems;
    newItem[type][numberId].push(element);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newItem));
    setIsCheck(true);
  };

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

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  element: PropTypes.string.isRequired,
};

export default Ingredient;
