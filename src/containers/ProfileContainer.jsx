import React, { useState, useEffect } from 'react';
import NavBar from './NavContainer.jsx';

export default function ProfilePage() {
  const [userData, setUserData] = useState();

  const id = 1;

  useEffect(() => {
    fetch(`/user/${id}`)
    .then(data => data.json())
    .then(data => {
      setUserData(data[0].username);
    })
  }, [])

  return(
    <div>
      <NavBar/>
      <br/><br/>
      Profile
      <div>{userData}</div>
    </div>
  )
};