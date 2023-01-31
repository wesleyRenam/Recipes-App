import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" searchButton={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
