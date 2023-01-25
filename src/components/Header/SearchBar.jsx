import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-radio-buttons"
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          name="search-radio-buttons"
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-radio-buttons"
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
