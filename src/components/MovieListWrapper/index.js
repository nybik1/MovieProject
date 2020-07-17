import React, { PureComponent } from 'react';
import MovieList from '../MovieList';
import s from './style.module.scss';
import { Pagination, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { loadMovies, searchMovies } from '../../app/movies/actions';
import Nav from './../Nav';


class MovieListWrapper extends PureComponent {

    state = {
        isSearch: false,
        isMounted: false,
        inputValue: '',
    }

    inputRef = React.createRef();

    handlePageChange = (page) => {
        document.body.scrollIntoView();
        // const input = this.inputRef.current.value;
        if (this.state.isSearch) {
            return this.props.searchMovies({ page, query: this.state.inputValue })
        }
        this.props.loadMovies({ page })

    }

    searchHandler = (e) => {
        e.preventDefault();
        const [input] = e.target;
        this.props.searchMovies({
            query: input.value,
        });
        this.setState({ isSearch: true });

    }

    clearSearch = (e) => {
        this.setState({ isSearch: false, inputValue: '' });
        this.props.loadMovies()
    }

    changeMount = () => {
        this.setState({ isMounted: true })
    }

    render() {
        return (
            <div>
                <Nav />
                < div className={s.wrapper} id='wrapper' >
                    <div className={s.search}>
                        <h3 className={s.search__title}>Movie search</h3>
                        <form className={s.search__form} onSubmit={this.searchHandler} >
                            <Input onChange={(event) => { this.setState({ inputValue: event.target.value }) }} value={this.state.inputValue} className={s.search__input} ref={this.inputRef} placeholder="Start enter movies name to search" />
                        </form>
                        <Button onClick={this.clearSearch}>Clear search</Button>
                    </div>
                    <MovieList />
                    <div className={s.pagination}>
                        <Pagination defaultCurrent={1} total={this.props.total} pageSize={20} showSizeChanger={false} onChange={this.handlePageChange} />
                    </div>
                </div >
            </div>
        )
    }
}

export default connect(({ movies: { total } }) => ({
    total,
}), { loadMovies, searchMovies })(MovieListWrapper);