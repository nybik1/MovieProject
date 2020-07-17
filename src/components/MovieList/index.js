import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../movieItem';
import { loadMovies, searchMovies } from '../../app/movies/actions';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import s from './style.module.scss';





class moviesList extends Component {

    // componentDidMount() {
    //     this.props.onMount(true)
    // }


    render() {
        const style = {
            fontSize: '150px',
        };
        const { loading, error } = this.props;
        const antIcon = <LoadingOutlined style={style} spin />;


        return (
            <div>
                <div className='container'>
                    {loading && <div className={s.spinner}><Spin indicator={antIcon} /></div>}
                    {error && <h3>${error}</h3>}
                    {!loading && <div className={s.movie_list}>
                        {this.props.moviesList.map((movie) => (
                            <MovieItem key={movie.id}
                                movie={movie} >
                            </MovieItem>))}
                    </div >}
                </div>
            </div>
        )
    }
}

export default connect(({ movies: { list, loading, error, isSearch } }) => ({
    moviesList: list,
    loading,
    error,
    isSearch,
}), { loadMovies, searchMovies })(moviesList);