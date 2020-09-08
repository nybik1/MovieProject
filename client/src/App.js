import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loadMovies } from './app/movies/actions/movie_actions';
import {
  BrowserRouter as Router, Route,
} from "react-router-dom";
import Auth from './hoc/auth.js';
import MovieListWrapper from './components/MovieListWrapper';
import MovieDetails from './components/MovieDetails/MovieDetails';
import About from './components/About';
import FavoriteMovies from './components/Favorites';
import ActorDetails from './components/ActorDetails';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';





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
        <Route path='/' exact component={Auth(MovieListWrapper, false)} />
        <Route path='/movie/:id' exact component={MovieDetails} />
        <Route path='/about' exact component={About} />
        <Route path='/favorites' exact component={FavoriteMovies} />
        <Route path='/register' component={Auth(RegisterPage, false)} />
        <Route path='/login' component={Auth(LoginPage, false)} />
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
