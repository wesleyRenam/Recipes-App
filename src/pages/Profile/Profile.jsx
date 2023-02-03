import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Profile() {
  const getItems = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" searchButton={ false } />
      <div>
        <h1 data-testid="profile-email">{getItems ? getItems.email : 'usuario'}</h1>
        <Link
          to="/done-recipes"
          data-testid="profile-done-btn"
        >
          Done Recipes

        </Link>
        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes

        </Link>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
