import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import s from './style.module.scss';

function Favorite(props) {
    const user = useSelector(state => state.user)
    const userFrom = props.userFrom


    const [Favorited, setFavorited] = useState(false)

    const variables = {
        movieInfo: props.movieInfo,
        userFrom: userFrom,
    };



    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {

                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {
        let mounted = true;

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success && mounted) {
                    setFavorited(response.data.subcribed)
                }
            })
        return () => mounted = false;
    }, [])

    const favoriteBtnText = Favorited ? 'Remove from favorites' : 'Add to favorites';

    return (
        <>
            <button onClick={onClickFavorite} className={cs(s.addFavorite, ({ [s.inFavorites]: !Favorited }))} >{favoriteBtnText}</button>
        </>
    )
}

export default Favorite;