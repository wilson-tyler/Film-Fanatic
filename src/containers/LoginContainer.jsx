import React, { Component, useState, useEffect } from 'react';
import HomeContainer from './HomeContainer.jsx';


export default function LoginContainer() {
  const [loggedIn, setLoggedIn] = useState(false);

  //   window.open(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`, 'GitHub', 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100')

  useEffect(() => {
    if (document.cookie) {
      const cleanCookie = document.cookie.split('; ').find(row => row.startsWith('code='))?.split('=')[1]
      if (cleanCookie.length === 20) {
        fetch(`/home/verifyUser/${cleanCookie}`)
          .then(data => data.json())
          .then(data => {
            if (data[0].sessioncookie === cleanCookie) setLoggedIn(true);
          })
      }
    }
  });

  return (
    loggedIn
      ? <HomeContainer />
      : <div id='loginContainer'>
        <div className='filmFanaticHomeTitle'>HUNT'S SPREADSHEET</div>
        <br />
        Please sign in through the application you trust the most to begin using Spreadsheet.
        <br />
        <br />
        <a id='githubOAuth' href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}></a>
      </div>
  );
}