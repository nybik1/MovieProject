import React from 'react';
import { useSelector } from "react-redux";
import s from './style.module.scss';
import axios from 'axios';
import Header from './../Header';
import moment from 'moment';
import MovieItem from './../MovieItem';

function ProfilePage(props) {

    const user = useSelector(state => state.user.userData);
    const [Favorites, setFavorites] = React.useState([])
    const [Comments, setComments] = React.useState([]);
    const [Likes, setLikes] = React.useState([]);
    const [Dislikes, setDislikes] = React.useState([]);

    let variable = { userFrom: localStorage.getItem('userId') }

    React.useEffect(() => {
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
        axios.post('/api/comment/getUserComments', variable)
            .then(response => {
                if (response.data.success && mounted) {
                    // console.log(response.data.favorites)
                    setComments(response.data.comments)
                } else {
                    alert('Failed to get user comments')
                }
            })

        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success && mounted) {
                    // console.log(response.data.favorites)
                    setLikes(response.data.likes)
                } else {
                    alert('Failed to get likes')
                }
            })
        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success && mounted) {
                    // console.log(response.data.favorites)
                    setDislikes(response.data.dislikes)
                } else {
                    alert('Failed to get dislikes')
                }
            })
        return () => mounted = false;
    }, [])


    return (
        <>
            <Header />
            <div className={s.profile}>
                {user &&
                    <div className={s.profile__block}>
                        <img src={user.image} alt="avatar" className={s.profile__avatar} />
                        <p>Member from {moment(user.createdAt).format('llll')}</p>
                        <div className={s.profile__stats}>
                            <p>Total likes: <strong>{Likes.length}</strong></p>
                            <p>Total dislikes: <strong>{Dislikes.length}</strong></p>
                            <p>Total comments: <strong>{Comments.length}</strong></p>
                        </div>
                    </div>}
                <div className={s.profile__favorites}>
                    {Favorites.length === 0 && <h3>You don't have favorite movies yet:) </h3>}
                    {Favorites && Favorites.map(movie => <MovieItem movie={movie.movieInfo} />)}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;