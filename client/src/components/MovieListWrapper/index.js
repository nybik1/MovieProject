import React, { PureComponent } from 'react';
import MovieList from '../MovieList';
import s from './style.module.scss';
import { Pagination, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { loadMovies, searchMovies, filterMovies } from '../../app/movies/actions/movie_actions';
import Nav from '../Nav';
import RightMenu from '../RightMenu';
import { genres } from '../Config';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();



class MovieListWrapper extends PureComponent {

    state = {
        isSearch: false,
        isMounted: false,
        inputValue: '',
        selectedOption: [],
    }

    inputRef = React.createRef();

    handlePageChange = (page) => {
        document.body.scrollIntoView();
        // const input = this.inputRef.current.value;
        const genres = this.props.selectedOption.length > 0 ? this.props.selectedOption.map(genre => genre.value).join(',') : '';
        if (this.state.isSearch) {
            return this.props.searchMovies({ page, query: this.state.inputValue, genres: genres })
        }
        this.props.loadMovies({ page, genres: genres })
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption }, this.showByFilter);
        this.props.filterMovies({ genre: selectedOption })
        // console.log(`Option selected:`, selectedOption);
    };

    showByFilter = () => {
        if (this.state.selectedOption === null) {
            return this.props.loadMovies();
        }
        const genres = this.props.selectedOption.map(genre => genre.value).join(',');
        this.props.loadMovies({ genres: genres })

    }

    searchHandler = (e) => {
        e.preventDefault();
        const [input] = e.target;
        this.props.searchMovies({
            query: input.value,
        });
        this.setState({ isSearch: true });

    }

    clearSearch = () => {
        this.setState({ isSearch: false, inputValue: '' });
        this.props.filterMovies({ genre: [] })
        this.props.loadMovies()

    }

    changeMount = () => {
        this.setState({ isMounted: true })
    }





    render() {

        // const { selectedOption } = this.props.selectedOption;
        // console.log(this.props.selectedOption);

        return (
            <>
                <Nav />
                < div className={s.wrapper} id='wrapper' >
                    <RightMenu />
                    <div className={s.search}>
                        <h3 className={s.search__title}>Movie search</h3>
                        <form className={s.search__form} onSubmit={this.searchHandler} >
                            <Input onChange={(event) => { this.setState({ inputValue: event.target.value }) }} value={this.state.inputValue} className={s.search__input} ref={this.inputRef} placeholder="Start enter movies name to search" />
                        </form>
                        <Select onChange={this.handleChange} options={genres} value={this.props.selectedOption} className={s.search__genres} isMulti={true} components={animatedComponents} placeholder="Select filters"></Select>
                        <Button onClick={this.clearSearch}>Clear search</Button>
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

export default connect(({ movies: { total, selectedOption, currentPage } }) => ({
    total,
    selectedOption,
    currentPage,
}), { loadMovies, searchMovies, filterMovies })(MovieListWrapper);