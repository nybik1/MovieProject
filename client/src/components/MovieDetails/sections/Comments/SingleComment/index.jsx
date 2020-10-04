import React from 'react'
import LikeDislikes from '../../LikeDislike/LikeDislike';
import s from './style.module.scss';
import moment from 'moment';


function SingleComment(props) {




    return (
        <div>
            <div className={s.singleComment}>
                <div className={s.singleComment__wrapper}>
                    <div className={s.singleComment__avatar}>
                        <img src={props.comment.userFrom.image} alt="avatar" />
                        <h4 className={s.singleComment__author}>Comment by: <strong>{props.comment.userFrom.username}</strong></h4>
                    </div>
                    <div className={s.likeDislike__wrapper}>
                        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />
                    </div>
                </div>

                <p className={s.singleComment__text}> {props.comment.content}</p>
                <p>{moment(props.comment.createdAt).format('llll')}</p>
            </div>

        </div >
    )
}


export default SingleComment
