import React from 'react';
import s from './style.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import sprite from './../../imgs/icons.svg';
import backBtn from '../../imgs/back.svg'
import ModalImage from "react-modal-image";
import 'react-lazy-load-image-component/src/effects/blur.css';

function ActorDetails(props) {

    const [actorInfo, setActorInfo] = React.useState({});
    const [actorMedia, setActorMedia] = React.useState({});
    const [externalID, setExternalID] = React.useState({});
    const [actorCredits, setActorCredits] = React.useState([]);
    const [loadedActorData, setLoadedMedia] = React.useState(false);

    React.useEffect(() => {
        setActorMedia(false)
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.id}?api_key=4fbb4691e328ec322d3358761a861113&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                setActorInfo(data)
            });
    }, [props.match.params.id]);

    React.useEffect(() => {
        setActorMedia(false)
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.id}/images?api_key=4fbb4691e328ec322d3358761a861113&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                setActorMedia(data)
            });
    }, [props.match.params.id]);

    React.useEffect(() => {
        setActorMedia(false)
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.id}/movie_credits?api_key=4fbb4691e328ec322d3358761a861113&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                setActorCredits(data.cast.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1).splice(0, 20))
            });
    }, [props.match.params.id]);


    React.useEffect(() => {
        setActorMedia(false)
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.id}/external_ids?api_key=4fbb4691e328ec322d3358761a861113&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                setExternalID(data)
                setLoadedMedia(true);
            });
    }, [props.match.params.id]);


    return (
        <>
            {loadedActorData &&
                <div className={s.actorBlock}>
                    <div className={s.actorPoster}>
                        <img alt='actorPhoto' src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${actorInfo.profile_path}`}></img>
                        <button onClick={() => props.history.go(-1)}><img alt='btnBack' src={backBtn} /> </button>
                    </div>
                    <div className={s.actorInfo}>
                        <h2 className={s.actorName}>{actorInfo.name}</h2>
                        <p className={s.actorDateBirth}>Date of birth: <strong>{actorInfo.birthday}</strong></p>
                        <p className={s.actorPlaceBirth}>Place of birth: <strong>{actorInfo.place_of_birth}</strong></p>
                        <div className={s.actorSocial}>
                            {externalID.instagram_id &&
                                <a target='_blank' rel='noopener noreferrer' href={`https://www.instagram.com/` + externalID.instagram_id}>
                                    <div className={s.actorSocialIcon}>
                                        <svg width='48' height='48'>
                                            <use href={sprite + '#instagram'}>
                                            </use>
                                        </svg>
                                    </div>
                                </a>}
                            {externalID.facebook_id &&
                                <a target='_blank' rel='noopener noreferrer' href={`https://www.facebook.com/` + externalID.facebook_id}>
                                    <div className={s.actorSocialIcon}>
                                        <svg width='48' height='48'>
                                            <use href={sprite + '#facebook'}>
                                            </use>
                                        </svg>
                                    </div>
                                </a>}
                            {externalID.twitter_id &&
                                <a target='_blank' rel='noopener noreferrer' href={`https://www.facebook.com/` + externalID.twitter_id}>
                                    <div className={s.actorSocialIcon}>
                                        <svg width='48' height='48'>
                                            <use href={sprite + '#twitter'}>
                                            </use>
                                        </svg>
                                    </div>
                                </a>}
                        </div>
                        <p className={s.actorBio}>{actorInfo.biography}</p>
                        {actorMedia.profiles &&
                            <div className={s.actorPhotos}>
                                {actorMedia.profiles.map((item) =>
                                    <div key={item.file_path} className={s.actorPhoto}>
                                        <ModalImage
                                            showRotate={true}
                                            small={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.file_path}`}
                                            large={`https://image.tmdb.org/t/p/original/${item.file_path}`}>
                                        </ModalImage>
                                    </div>)}
                            </div>}
                    </div>
                </div>}
            <>
                <h3 className={s.actorMoviesTitle}>Known for</h3>
                {loadedActorData &&
                    <div className={s.actorMovies}>
                        {actorCredits.map(item =>
                            <Link key={item.id} to={`/movie/` + item.id}>
                                <div className={s.actorMovie}>
                                    {!item.poster_path && <LazyLoadImage alt={'moviePoster'} src='https://via.placeholder.com/300x450' effect='blur' max-width={300} max-height={450} />}
                                    {item.poster_path && <LazyLoadImage alt={'moviePoster'} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} effect='blur' max-width={300} max-height={450} />}
                                </div>
                            </Link>)}
                    </div>}
            </>
        </>
    );
}

export default ActorDetails;