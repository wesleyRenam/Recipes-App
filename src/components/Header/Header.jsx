import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const { pathname } = useLocation();

  let str = pathname.replace(/-/g, ' ');
  str = str.replace(/\b\w/g, (l) => l.toUpperCase());
  str = str.replace('/', '');
  const pesquisa = pathname === '/done-recipes' || '/favorite-recipes' || '/profile":';
  return (
    <div>
      { !pesquisa ? <img
        src={ searchIcon }
        alt="profile-icon"
        data-testid="search-top-btn"
      /> : ''}
      <h1 data-testid="page-title">
        { str }
      </h1>
      <img
        src={ profileIcon }
        alt="profile-icon"
        data-testid="profile-top-btn"
      />
    </div>
  );
}

export default Header;
