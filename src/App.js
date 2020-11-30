import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FilmsPage from './components/FilmsPage/FilmsPage';
import NewFilm from './components/NewFilm/NewFilm';
import FilmPage from './components/FilmPage/FilmPage';


function App() {
  return (
    <Router>
      <Route path = "/" component = { FilmsPage } exact />
      <Route path = "/new-film" component = { NewFilm } exact />
      <Route path = "/about/:id" component = { FilmPage } exact />
    </Router>
  );
}

export default App;