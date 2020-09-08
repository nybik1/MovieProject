import React from 'react';
import s from './style.module.scss';
import axios from 'axios';
import { USER_SERVER } from './../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {

    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                window.localStorage.removeItem('userId')
                props.history.push("/");
            } else {
                alert('Log Out Failed')
            }
        });
    };
    if (user.userData && !user.userData.isAuth) {
        return (
            <div className={s.menu_wrapper}>
                <Link className={s.signUp} to='/register'>Sign Up</Link>
                <Link className={s.signIn} to='/login'>Sign In</Link>
            </div>
        )
    } else {
        return (
            <div className={s.menu_wrapper}>
                <Link className={s.logOut} to='/login' onClick={logoutHandler}>Log Out</Link>
            </div>
        );
    }




}

export default withRouter(RightMenu);