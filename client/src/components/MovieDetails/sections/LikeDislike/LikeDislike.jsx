import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import sprite from './../../../../imgs/icons.svg';
import s from './style.module.scss';
import cs from 'classnames';


function LikeDislikes(props) {
    const user = useSelector(state => state.user)

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }




    useEffect(() => {
        let mounted = true;

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                // console.log('getLikes', response.data)

                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.likes.length)

                    //if I already click this like button or not 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                // console.log('getDislike', response.data)
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setDislikes(response.data.dislikes.length)

                    //if I already click this like button or not 
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })
        return () => mounted = false;
    }, [])


    const onLike = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }


    const onDisLike = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })


        }


    }

    return (
        <React.Fragment>
            <div className={s.like} onClick={onLike}>
                <svg width='48' height='48' className={cs(null, { [s.liked]: LikeAction === 'liked' })} >
                    <use href={sprite + '#like'}>
                    </use>
                </svg>
                <span className={s.likeDislike__count}>{Likes}</span>
            </div>
            <div className={s.dislike} onClick={onDisLike}>
                <svg width='48' height='48' className={cs(null, { [s.disliked]: DislikeAction === 'disliked' })} >
                    <use href={sprite + '#dislike'}>
                    </use>
                </svg>
                <span className={s.likeDislike__count} >{Dislikes}</span>
            </div>
        </React.Fragment>
    )
}

export default LikeDislikes
