import React, { useState, useEffect } from 'react';
import ProfilePage from './ProfileContainer.jsx';

export default function NavContainer() {
  const [profile, setProfile] = useState(false);

  return (
    profile
    ? <ProfilePage />
    : <ul>
      <li><a href="default.asp">Home</a></li>
      <li><a href="news.asp">News</a></li>
      <li><a href="contact.asp">Contact</a></li>
      <li style={{ float: "right" }}><a onClick={() => setProfile(true)}>Profile</a></li>
    </ul>
  );
}