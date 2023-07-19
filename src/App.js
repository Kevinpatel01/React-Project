import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
  const [myData, setMyData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?s=man&apikey=4a3b711b")
      .then((res) => setMyData(res.data.Search || []))
      .catch((error) =>
        console.log("~ file:App.js ~line 15 ~useEffect ~error", error)
      );
  }, [buttonClicked]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  // const handleBackButtonClick = () => {
  //   history.goBack();
  // };

  return (
    <Router>
      <div>
        <h1>Movies</h1>
        <Routes>
          <Route path="/" element={<Home myData={myData} />} />
          {myData.map((post) => {
            const { imdbID } = post;
            return (
              <Route
                key={imdbID}
                path={`/movie/${imdbID}`}
                element={<MovieDetails imdbID={imdbID} myData={myData} />}
                
              />
              
            );
            
          })}
          {/* <button onClick={handleBackButtonClick}>Back</button> */}
        </Routes>
      </div>
    </Router>
  );
}

function Home({ myData }) {
  return (
    <div className="grid">
      {myData.map((post) => {
        const { Title, Year, imdbID, Type, Poster } = post;
        return (
          <div className="movie" key={imdbID}>
            <div id="m">
              <Link to={`/movie/${imdbID}`}>
                <img
                  src={Poster}
                  alt="Movie Poster"
                  className="movie-poster"
                />
               
              </Link>
              <p>{Title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MovieDetails({ imdbID, myData }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const movie = myData.find((movie) => movie.imdbID === imdbID);
    setSelectedMovie(movie);
  }, [imdbID, myData]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="selected-movie">
      <h2>Selected Movie: {selectedMovie.Title}</h2>
      <p><b>Type:</b> {selectedMovie.Type}</p>
      <p><b>Year:</b> {selectedMovie.Year}</p>
      <p><b>Id:</b> {selectedMovie.imdbID}</p>
      <img src={selectedMovie.Poster} alt="Movie Poster" />
    </div>
  );
}

export default App;