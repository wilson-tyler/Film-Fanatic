import React, { useState, useEffect } from 'react';
import ProfilePage from './ProfileContainer.jsx';

export default function HomeContainer() {
  const [movies, setMovies] = useState();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const newList = [];
    let ranking = 1;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
      for (let film of data.results) {
        let poster = `https://image.tmdb.org/t/p/original/${film.poster_path}`
        newList.push(<div key={ranking}>{ranking}: {film.title}<img className='moviePoster' src={poster}/></div>);
        ranking++;
      }
      ranking = 1;
      setMovies(newList);
    })
  }, [])

  return (
    profile
    ? <ProfilePage/>
    : <div><button onClick={() => setProfile(true)}>Profile</button>Popular Movies of Today
        <div className='movieTable'>{movies}</div>
      </div>
  );
}