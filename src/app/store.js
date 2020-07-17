import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/reducer';
import thunk from 'redux-thunk';



export default configureStore({
  reducer: {
    movies: moviesReducer,
    search: { items: [] },
  },
  middleware: [thunk],
  devTools: true
});
