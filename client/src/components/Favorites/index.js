import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem';
import axios from 'axios';
import backBtn from './../../imgs/back.svg'
import { set } from 'mongoose';
import s from './style.module.scss';

function FavoriteMovies(props) {

    const [Favorites, setFavorites] = useState([])
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        let mounted = true;
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success && mounted) {
                    // console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
        return () => mounted = false;
    }, [])

    // const fetchFavoredMovie = () => {
    //     axios.post('/api/favorite/getFavoredMovie', variable)
    //         .then(response => {
    //             if (response.data.success) {
    //                 // console.log(response.data.favorites)
    //                 setFavorites(response.data.favorites)
    //             } else {
    //                 alert('Failed to get subscription videos')
    //             }
    //         })
    // }


    return (
        <>
            <button className={s.favoriteBtnBack} title='Back to main page' onClick={() => props.history.go(-1)}><img alt='btnBack' src={backBtn} /> </button>
            <div className={s.favorite__movie}>
                {Favorites && Favorites.map(movie =>
                    <MovieItem key={movie.movieInfo.id} movie={movie.movieInfo} />)
                }
            </div >
        </>
    )
}




// export default connect(({ movies: { list } }) => ({
//     movieList: list
// }))(FavoriteMovies);  

export default FavoriteMovies;