import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loadMovies } from './app/movies/actions';
import {
  BrowserRouter as Router, Route,
} from "react-router-dom";
import MovieListWrapper from './components/MovieListWrapper';
import MovieDetails from './components/MovieDetails/MovieDetails';
import About from './components/About';
import FavoriteMovies from './components/Favorites';
import ActorDetails from './components/ActorDetails';




class App extends Component {

  componentDidMount() {
    this.props.loadMovies();

    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', '[]')
    }
  }




  render() {

    return (
      <Router>
        <Route path='/' exact component={MovieListWrapper} />
        <Route path='/movie/:id' exact component={MovieDetails} />
        <Route path='/about' exact component={About} />
        <Route path='/favorites' exact component={FavoriteMovies} />
        <Route path='/actor/:id' exact component={ActorDetails}></Route>
      </Router>
    );
  }

}

export default connect(({ movies: { loading, error, total } }) => ({
  loading,
  error,
  total,


}), { loadMovies })(App);  
