import React from 'react';
import s from './style.module.scss';
import axios from 'axios';
import { USER_SERVER } from './../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import cs from 'classnames';
import sprite from './../../imgs/icons.svg';

function RightMenu(props) {


    const [userMenu, toggleMenu] = React.useState(false)

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
                <p className={s.menu__welcome}>Welcome, <strong>guest!</strong> </p>
                <Link className={s.signUp} to='/register'>Create account</Link>
                <Link className={s.signIn} to='/login'>Login</Link>
            </div>
        )
    } else {
        return (
            <>
                {user.userData &&
                    <div className={s.menu__user}>
                        {/* <p className={s.menu__welcome} >Welcome, <strong>{user.userData.username}</strong> </p> */}
                        <img src={user.userData.image} alt='user avatar' />
                        <div className={cs(s.menu__toggler, { [s.menu__toggler_reverse]: userMenu === true })} onClick={() => toggleMenu(!userMenu)}>
                            <svg width='50' height='50' fill='#f55b5b'>
                                <use href={sprite + '#arrow'}></use>
                            </svg>
                        </div>
                        {/* <button type='button' onClick={() => toggleMenu(!userMenu)}>menu</button> */}
                        <div className={cs(s.menu__nav,
                            { [s.menu__nav_active]: userMenu === true }
                        )}>
                            <Link className={s.logOut} to='/profile'>Go to profile</Link>
                            <Link className={s.logOut} to='/login' onClick={logoutHandler}>Log Out</Link>
                        </div>
                    </div>}
            </>
        );
    }




}

export default withRouter(RightMenu);