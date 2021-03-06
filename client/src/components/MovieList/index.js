import React from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import s from './style.module.scss';





function moviesList(props) {

    const style = {
        fontSize: '150px',
    };
    const { loading, error } = props;
    const antIcon = <LoadingOutlined style={style} spin />;


    return (
        <>
            <div className='container'>
                {loading && <div className={s.spinner}><Spin indicator={antIcon} /></div>}
                {error && <h3>${error}</h3>}
                {!loading && <div className={s.movie_list}>
                    {props.moviesList.map((movie) => (
                        <MovieItem key={movie.id}
                            movie={movie} >
                        </MovieItem>))}
                </div >}
            </div>
        </>
    )
}

export default connect(({ movies: { list, loading, error, isSearch } }) => ({
    moviesList: list,
    loading,
    error,
    isSearch,
}))(moviesList);