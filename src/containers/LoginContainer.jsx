import React, { Component, useState, useEffect } from 'react';
import HomeContainer from './HomeContainer.jsx'

export default function LoginContainer() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [movies, setMovies] = useState();

  return (
    loggedIn
      ? <HomeContainer />
      : <div>login screen
      </div>
  );
}