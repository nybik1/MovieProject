import React, { useState, useEffect } from 'react';
import s from './style.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';




export default function Similar({ movieId }) {
    const [similarMovies, setSimilar] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=4fbb4691e328ec322d3358761a861113`)
            .then((res) => res.json())
            .then((data) => {
                setSimilar(data.results)
            })
    }, [movieId]);


    return (
        <div>
            <h3 className={s.similar__title}>Similar movies</h3>
            <div className={s.similarMovies}>
                {similarMovies.map(item =>
                    <Link key={item.id} to={'/movie/' + item.id}>
                        <div className={s.similarMovie}>
                            <div className={s.moviePosterWrapper}>
                                {item.poster_path &&
                                    <LazyLoadImage alt={'moviePoster'} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} effect='blur' width={180} height={270} />}
                                {!item.poster_path &&
                                    <LazyLoadImage alt={'moviePoster'} src={`'https://via.placeholder.com/100x150'`} effect='blur' width={180} height={270} />}
                            </div>
                        </div>
                    </Link>)}
            </div>
        </div>
    )

}


