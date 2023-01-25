import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pathname } = useLocation();

  const history = useHistory();

  let str = pathname.replace(/-/g, ' ');
  str = str.replace(/\b\w/g, (l) => l.toUpperCase());
  str = str.replace('/', '');

  const [searchBar, setSearchBar] = useState(false);

  const pesquisa = (pathname === '/meals' || pathname === '/drinks');
  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>
      { pesquisa ? (
        <button
          type="button"
          onClick={ () => setSearchBar(!searchBar) }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
          />
        </button>
      ) : ''}
      <h1 data-testid="page-title">
        { str }
      </h1>
      { searchBar ? (
        <input
          data-testid="search-input"
          type="text"
        />)
        : ''}
      <SearchBar />
    </div>
  );
}

export default Header;
