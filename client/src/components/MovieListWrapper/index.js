import React, { PureComponent } from 'react';
import MovieList from '../MovieList';
import Header from '../Header';
import s from './style.module.scss';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { loadMovies, searchMovies, filterMovies, setQuery } from '../../app/movies/actions/movie_actions';
import { genres } from '../Config';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();



class MovieListWrapper extends PureComponent {

    state = {
        isSearch: false,
        isMounted: false,
    }

    inputRef = React.createRef();

    handlePageChange = (page) => {
        document.body.scrollIntoView();
        const genres = this.props.selectedOption !== null ? this.props.selectedOption.map(genre => genre.value).join(',') : '';
        if (this.props.isSearch) {
            return this.props.searchMovies({ page, query: this.props.query, genres: genres })
        }
        this.props.loadMovies({ page, genres: genres })
    }

    handleChange = async (selectedOption) => {
        if (this.props.isSearch) {
            this.props.setQuery({ query: '', isSearch: false });
        }

        await this.props.filterMovies({ genre: selectedOption });

        if (this.props.selectedOption === null) {
            return this.props.loadMovies();
        }

        const genres = await this.props.selectedOption.map(genre => genre.value).join(',');
        this.props.loadMovies({ genres: genres })
    };

    componentDidMount() {
        if (this.props.isSearch) {
            return this.props.searchMovies({ query: this.props.query })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query && this.props.query !== '') {
            return this.props.searchMovies({ query: this.props.query })
        }
    }





    render() {

        return (
            <>
                < div className={s.wrapper} id='wrapper' >
                    <Header />
                    <div className={s.selectWrapper}>
                        <Select
                            onChange={this.handleChange}
                            options={genres}
                            value={this.props.selectedOption}
                            className={s.search__genres}
                            isMulti={true} components={animatedComponents}
                            placeholder="Select genres">
                        </Select>
                    </div>
                    <MovieList />
                    <div className={s.pagination}>
                        <Pagination defaultCurrent={1} current={this.props.currentPage} total={this.props.total} pageSize={20} showSizeChanger={false} onChange={this.handlePageChange} />
                    </div>
                </div >
            </>
        )
    }
}

export default connect(({ movies: { total, selectedOption, currentPage, isSearch, query } }) => ({
    total,
    selectedOption,
    currentPage,
    isSearch,
    query
}), { loadMovies, searchMovies, filterMovies, setQuery })(MovieListWrapper);