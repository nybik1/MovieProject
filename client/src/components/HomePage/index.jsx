import React from 'react';
import { connect } from 'react-redux';
import Header from './../Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import s from './style.module.scss';
import { genres } from './../../components/Config';
import cs from 'classnames';
import { Link } from 'react-router-dom';



class HomePage extends React.Component {

    render() {
        const settings = {
            infinite: true,
            slidesToShow: 4,
            speed: 2000,
            adaptiveHeight: true,
            lazyLoad: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            slidesToScroll: 3,
        };

        return (
            <>
                <Header />
                <div className={s.home__slider}>
                    <h3 className={s.home__title}>Trends on this week</h3>
                    <Slider {...settings}>
                        {this.props.trending.map(movie =>
                            <div key={movie.id}>
                                <div className={s.movie__wrapper}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" />
                                    <div className={s.movie__info} >
                                        <span className={s.movie__original_title}>{movie.title}</span>
                                        {genres.filter(itemA =>
                                            itemA.value === movie.genre_ids[0]
                                            || itemA.value === movie.genre_ids[1]
                                            || itemA.value === movie.genre_ids[2]
                                            || itemA.value === movie.genre_ids[3]
                                        )
                                            .map(item =>
                                                <div key={item.value} className={s.movie__genres}>
                                                    <p className={cs(s.movie__genre,
                                                        { [s.action]: item.label === 'Action' },
                                                        { [s.adventure]: item.label === 'Adventure' },
                                                        { [s.animation]: item.label === 'Animation' },
                                                        { [s.comedy]: item.label === 'Comedy' },
                                                        { [s.crime]: item.label === 'Crime' },
                                                        { [s.documentary]: item.label === 'Documentary' },
                                                        { [s.drama]: item.label === 'Drama' },
                                                        { [s.family]: item.label === 'Family' },
                                                        { [s.fantasy]: item.label === 'Fantasy' },
                                                        { [s.history]: item.label === 'History' },
                                                        { [s.horror]: item.label === 'Horror' },
                                                        { [s.music]: item.label === 'Music' },
                                                        { [s.mystery]: item.label === 'Mystery' },
                                                        { [s.romance]: item.label === 'Romance' },
                                                        { [s.science]: item.label === 'Science Fiction' },
                                                        { [s.tv]: item.label === 'TV Movie' },
                                                        { [s.thriller]: item.label === 'Thriller' },
                                                        { [s.war]: item.label === 'War' },
                                                        { [s.western]: item.label === 'Western' },
                                                    )}>{item.label}</p>

                                                </div>)
                                        }
                                        <Link to={`/movie/` + movie.id} >
                                            <button className={s.movie__link}>Details
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>)}
                    </Slider>
                </div>
                <div className={s.home__slider}>
                    <h3 className={s.home__title}>Most rated</h3>
                    <Slider {...settings}>
                        {this.props.toprated.map(movie =>
                            <div key={movie.id}>
                                <div className={s.movie__wrapper}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" />
                                    <div className={s.movie__info} >
                                        <span className={s.movie__original_title}>{movie.title}</span>
                                        {genres.filter(itemA =>
                                            itemA.value === movie.genre_ids[0]
                                            || itemA.value === movie.genre_ids[1]
                                            || itemA.value === movie.genre_ids[2]
                                            || itemA.value === movie.genre_ids[3]
                                        )
                                            .map(item =>
                                                <div key={item.value} className={s.movie__genres}>
                                                    <p className={cs(s.movie__genre,
                                                        { [s.action]: item.label === 'Action' },
                                                        { [s.adventure]: item.label === 'Adventure' },
                                                        { [s.animation]: item.label === 'Animation' },
                                                        { [s.comedy]: item.label === 'Comedy' },
                                                        { [s.crime]: item.label === 'Crime' },
                                                        { [s.documentary]: item.label === 'Documentary' },
                                                        { [s.drama]: item.label === 'Drama' },
                                                        { [s.family]: item.label === 'Family' },
                                                        { [s.fantasy]: item.label === 'Fantasy' },
                                                        { [s.history]: item.label === 'History' },
                                                        { [s.horror]: item.label === 'Horror' },
                                                        { [s.music]: item.label === 'Music' },
                                                        { [s.mystery]: item.label === 'Mystery' },
                                                        { [s.romance]: item.label === 'Romance' },
                                                        { [s.science]: item.label === 'Science Fiction' },
                                                        { [s.tv]: item.label === 'TV Movie' },
                                                        { [s.thriller]: item.label === 'Thriller' },
                                                        { [s.war]: item.label === 'War' },
                                                        { [s.western]: item.label === 'Western' },
                                                    )}>{item.label}
                                                    </p>
                                                    <Link to={`/movie/` + movie.id} >
                                                        <button className={s.movie__link}>Details
                                        </button>
                                                    </Link>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </div>)}
                    </Slider>
                </div>
            </>

        );
    }

}



export default connect(({ movies: { trending, toprated } }) => ({
    trending,
    toprated
}))(HomePage);