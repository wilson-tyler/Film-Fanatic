import React, { Component, useState, useEffect } from 'react';
import HomeContainer from './HomeContainer.jsx'


export default function LoginContainer() {
  const [loggedIn, setLoggedIn] = useState(false);

  // const getGithub = async () => {
  //   window.open(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`, 'GitHub', 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100')
  // }

  return (
    loggedIn
      ? <HomeContainer />
      : <div>login screen
        <div>Welcome to Film Fanatic.</div>
        <br />
        Please sign in through the application you trust the most to begin browsing titles.
        <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}>Login with GitHub</a>
      </div>
  );
}