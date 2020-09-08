import React from 'react';
import s from './style.module.scss';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Button } from 'antd';

const MovieItem = React.memo(function MovieItem({ movie }) {

    return (
        <div key={movie.id} className={s.movieBlock}>
            <Link to={'/movie/' + movie.id}>
                {movie.poster_path && <LazyLoadImage alt={'moviePoster'} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width={250} height={345} effect='blur' />}
            </Link>
            <Link to={'/movie/' + movie.id}>
                {!movie.poster_path && <LazyLoadImage alt={'moviePoster'} src={`https://via.placeholder.com/230x345`} width={250} height={345} effect='blur' />}
            </Link>
            <div className={s.movieInfo}>
                <h4 className={s.movieTitle}>{movie.title}</h4>
                <div className={s.wrapper}>
                    <p className={s.movieRating}>Movie rating:</p>
                    {movie.vote_average &&
                        <div className={s.progressWrapper}>
                            <CircularProgressbar strokeWidth='5' value={movie.vote_average * 10} text={movie.vote_average}
                                styles={buildStyles({
                                    textSize: '36px',
                                    pathColor: "rgba(0,40,161,1)"
                                })}></CircularProgressbar>
                        </div>}
                    {!movie.vote_average &&
                        <div className={s.progressWrapper}>
                            <CircularProgressbar strokeWidth='5' value='0' text='0'
                                styles={buildStyles({
                                    textSize: '36px',
                                    pathColor: "rgba(0,40,161,1)"
                                })}></CircularProgressbar>
                        </div>}
                </div>

                <div className={s.ellipsis}>
                    <p className={s.movieDescr}> Movie description:{movie.overview}</p>
                </div>
                <p className={s.movieData}>Movie data release:{movie.release_date}</p>
                <div className={s.movie__buttonWrapper}>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.themoviedb.org/movie/${movie.id}`}>
                        <Button type='primary'>Check movie</Button>
                    </a>
                    <Button type='primary'>
                        <Link to={'/movie/' + movie.id} className={s.movie__details}>Details</Link>
                    </Button>
                </div>
            </div>
        </div >
    )
}
)

export default MovieItem;