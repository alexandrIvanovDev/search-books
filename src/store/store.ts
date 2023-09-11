import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './reducers/booksReducer.ts';
import filterReducer from './reducers/filterReducer.ts';
import {useDispatch} from 'react-redux';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()