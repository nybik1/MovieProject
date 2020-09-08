import { combineReducers } from 'redux';
import user from './../app/movies/reducers/user_reducer';
import movies from './../app/movies/reducers/movie_reducer';


const rootReducer = combineReducers({
  movies,
  user,
});

export default rootReducer;