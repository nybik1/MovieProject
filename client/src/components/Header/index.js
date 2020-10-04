import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import RightMenu from '../RightMenu';
import s from './style.module.scss';
import { setQuery, filterMovies, loadMovies } from './../../app/movies/actions/movie_actions';
import sprite from './../../imgs/icons.svg';


class Header extends PureComponent {
    state = {
        inputValue: this.props.query,
    }

    inputRef = React.createRef();


    searchHandler = (e) => {
        e.preventDefault();
        const [input] = e.target;
        this.props.setQuery({ query: input.value });
        if (this.props.history) {
            return this.props.history.push('/movies');
        }
    }

    clearSearch = () => {
        this.setState({ inputValue: '' });
        this.props.setQuery({ isSearch: false });
        this.props.filterMovies({ genre: [] })
        this.props.loadMovies()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query && this.props.query === '') {
            return this.setState({ inputValue: this.props.query })
        }
    }


    render() {
        return (
            <>
                <header className={s.header}>
                    <svg className={s.header__logo} width='70' height='70'>
                        <use href={sprite + '#movieCity'}></use>
                    </svg>
                    <nav className={s.header__nav}>
                        <Link className={s.header__item} to='/'>Home</Link>
                        <Link className={s.header__item} to='/movies'>Movies</Link>
                        <Link className={s.header__item} to='/favorites'>Favorites</Link>
                    </nav>
                    <div className={s.header__search}>
                        <form className={s.header__form} onSubmit={this.searchHandler} >
                            <input onChange={(event) => { this.setState({ inputValue: event.target.value }) }}
                                value={this.state.inputValue}
                                className={s.header__input}
                                ref={this.inputRef}
                                required='required'
                                placeholder="Enter movies name to search" />
                            <button className={s.header__input_clear} type='reset' title="Clear Search" onClick={this.clearSearch}>&times;</button>
                        </form>
                    </div>
                    {this.props.userData &&
                        <div className={s.header__user}>
                        </div>}
                    <RightMenu />
                </header>
            </>
        );
    }
}

export default withRouter(connect(({ movies: { query } }) => ({ query }), { setQuery, filterMovies, loadMovies })(Header));