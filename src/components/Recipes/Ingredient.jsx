import React from 'react';

function Ingredient(props) {
  const { id, index, element, validate } = props;
  return (
    <label
      htmlFor={ id }
      style={ { textDecoration: validate ? 'line-through solid rgb(0, 0, 0)' : '' } }
      data-testid={ `${index}-ingredient-step` }

    >
      <input
        type="checkbox"
        id={ id }
        onChange={ validate }
      />
      {element}
    </label>
  );
}

export default Ingredient;
