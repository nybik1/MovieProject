import axios from 'axios';
export const LOAD_MOVIES_PENDING = 'movies/LOAD_MOVIES_PENDING';
export const LOAD_MOVIES_FULFILLED = 'movies/LOAD_MOVIES_FULFILLED';
export const LOAD_MOVIES_REJECTED = 'movies/LOAD_MOVIES_REJECTED';
export const LOAD_TRENDING_MOVIES = 'movies/LOAD_TRENDING_MOVIES';
export const LOAD_TOP_MOVIES = 'movies/LOAD_TOP_MOVIES';
export const SEARCH_MOVIES = 'movies/SEARCH_MOVIES';
export const GET_MOVIE = 'movies/GET_MOVIE';
export const SET_FILTER_MOVIE = 'movies/SET_FILTER_MOVIE ';
export const SET_QUERY = 'movies/SET_QUERY ';


const API_KEY = '4fbb4691e328ec322d3358761a861113';


export const loadMovies = ({ page = 1, genres = '' } = {}) => (dispatch) => {
    dispatch({ type: LOAD_MOVIES_PENDING })
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genres}&page=${page}
    `)
        .then(({ data }) => {
            dispatch({
                type: LOAD_MOVIES_FULFILLED, payload: {
                    total: data.total_results,
                    items: data.results,
                    page
                }
            })
        })
        .catch((res) => {
            dispatch({ type: LOAD_MOVIES_REJECTED, payload: res.message })
        })
}

export const loadTrendingMovies = () => (dispatch) => {
    dispatch({ type: LOAD_MOVIES_PENDING })
    axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        .then(({ data }) => {
            dispatch({
                type: LOAD_TRENDING_MOVIES, payload: {
                    items: data.results,
                }
            })
        })
        .catch((res) => {
            dispatch({ type: LOAD_MOVIES_REJECTED, payload: res.message })
        })
}

export const loadTopRatedMovies = () => (dispatch) => {
    dispatch({ type: LOAD_MOVIES_PENDING })
    axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        .then(({ data }) => {
            dispatch({
                type: LOAD_TOP_MOVIES, payload: {
                    items: data.results,
                }
            })
        })
        .catch((res) => {
            dispatch({ type: LOAD_MOVIES_REJECTED, payload: res.message })
        })
}



export const searchMovies = ({ query, page = 1 } = {}) => (dispatch) => {
    axios(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${query}`)
        .then(({ data }) => {
            dispatch({
                type: SEARCH_MOVIES, payload: {
                    total: data.total_results,
                    items: data.results,
                    page
                }
            })
        })
}


export const getMovie = (id) => (dispatch) => {
    dispatch({ type: LOAD_MOVIES_PENDING })
    axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(({ data }) => {
            dispatch({
                type: GET_MOVIE,
                payload: data
            })
        })
}

export const filterMovies = (genre) => ({
    type: SET_FILTER_MOVIE,
    payload: genre
})

export const setQuery = ({ query = '', isSearch = true } = {}) => ({
    type: SET_QUERY,
    payload: {
        query,
        isSearch
    }
})









