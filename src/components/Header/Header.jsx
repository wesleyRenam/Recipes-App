import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

function Header({ title, profileButton, searchButton }) {
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();

  const profileRedirect = () => {
    history.push('/profile');
  };

  const handleToggle = () => {
    setIsSearch(!isSearch);
  };

  return (
    <header>
      { profileButton && (
        <button onClick={ profileRedirect }>
          <img src={ ProfileIcon } alt="Icone de perfil" data-testid="profile-top-btn" />
        </button>
      )}
      { searchButton && (
        <button onClick={ handleToggle }>
          <img src={ SearchIcon } alt="Icone de Pesquisa" data-testid="search-top-btn" />
        </button>
      )}
      <h1 data-testid="page-title">{title}</h1>
      {
        isSearch && (
          <input type="text" data-testid="search-input" />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string,
  profileButton: propTypes.bool,
  searchButton: propTypes.bool,
};

Header.defaultProps = {
  title: 'header',
  profileButton: true,
  searchButton: true,
};

export default Header;
