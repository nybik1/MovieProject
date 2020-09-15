import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from '../../LikeDislike/LikeDislike';
import s from './style.module.scss';
import moment from 'moment';
const { TextArea } = Input;


function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    // const actions = [
    //     <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
    //     <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    // ]

    return (
        <div>
            <div className={s.singleComment}>
                <div className={s.singleComment__wrapper}>
                    <div className={s.singleComment__avatar}>
                        <img src={props.comment.writer.image} alt="avatar" />
                        <h4 className={s.singleComment__author}>Comment by: <strong>{props.comment.writer.username}</strong></h4>
                    </div>
                    <div className={s.likeDislike__wrapper}>
                        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />
                    </div>
                </div>

                <p className={s.singleComment__text}> {props.comment.content}</p>
                <p>{moment(props.comment.createdAt).format('llll')}</p>
            </div>

            {/* 
            {
                OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            } */}

        </div >
    )
}

export default SingleComment
