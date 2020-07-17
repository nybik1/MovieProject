import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from './../movieItem';
import s from './style.module.scss';
import { Link } from 'react-router-dom';
import backBtn from './../../imgs/back.svg';


class FavoriteMovies extends Component {


    render() {
        const favorites = window.JSON.parse(localStorage.getItem('favorites'));
        return (
            <React.Fragment>
                <Link className='movie__btnBack' to='/'><img alt='btnBack' src={backBtn} /> </Link>
                <div className={s.favorites__movie}>
                    {favorites.map(movie => <div>
                        <MovieItem key={movie.id}
                            movie={movie} >
                        </MovieItem>))
                </div>)}
                </div>
            </React.Fragment>
        )
    }
}


export default connect(({ movies: { list } }) => ({
    movieList: list
}))(FavoriteMovies);  