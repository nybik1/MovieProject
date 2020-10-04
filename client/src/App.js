import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loadMovies, loadTrendingMovies, loadTopRatedMovies } from './app/movies/actions/movie_actions';
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
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';





class App extends Component {

  componentDidMount() {
    this.props.loadMovies();
    this.props.loadTrendingMovies();
    this.props.loadTopRatedMovies();

  }

  render() {

    return (
      <Router>
        <Route path='/' exact component={Auth(HomePage, false)} />
        <Route path='/movies' exact component={Auth(MovieListWrapper, null)} />
        <Route path='/movie/:id' exact component={Auth(MovieDetails, null)} />
        <Route path='/about' exact component={About} />
        <Route path='/favorites' exact component={Auth(FavoriteMovies, null)} />
        <Route path='/register' component={Auth(RegisterPage, false)} />
        <Route path='/login' component={Auth(LoginPage, false)} />
        <Route path='/actor/:id' exact component={Auth(ActorDetails, null)} />
        <Route path='/profile' exact component={Auth(ProfilePage, null)} />

      </Router>
    );
  }

}

export default connect(null, { loadMovies, loadTrendingMovies, loadTopRatedMovies })(App);  
