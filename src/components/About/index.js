import React from 'react';
import s from './style.module.scss';
import { Link } from 'react-router-dom';
import backBtn from './../../imgs/back.svg';

export default function About() {
    return (
        <React.Fragment>
            <Link className={s.movie__btnBack} to='/'><img alt='btnBack' src={backBtn} /> </Link>
            <div className={s.greeting}>
                <h4 className={s.greeting__title}>Hello!</h4>
                <div className={s.greeting__text}> <p>This is my final projects in Beetroot Acadamy(sad to say it)</p>
                    <p>In this app i try to learn react,redux, etc</p></div>
                <p>At this momment you can search movies, then you can go to <a href='https://www.themoviedb.org/?language=uk'>MovieDb site</a> and check movie info
            or you can click on Details and also see movie info, add movie to favorite, watch trailer, see reviews, media, cast</p>
            </div>
        </React.Fragment>
    )
}