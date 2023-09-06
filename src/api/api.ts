import axios from 'axios';
import {FilterType} from '../components/header/Header.tsx';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/'
})

export const api = {
    getBooks(term: string) {
        return instance.get(`volumes`, {params: {q: term, maxResults: 8}}).then(res => res.data)
    },
    getBook(id: string) {
        return instance.get(`volumes/${id}`).then(res => res.data)
    },
    changeFilter(term: string, newFilterValue: FilterType) {
        console.log(newFilterValue)
        return instance.get(`volumes/`, {params: {q: term, orderBy: newFilterValue, maxResults: 8}}).then(res => res.data)
    }
}