import React, { useState, useEffect } from 'react';

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
    <div>Profile
      <div>{userData}</div>
    </div>
  )
};