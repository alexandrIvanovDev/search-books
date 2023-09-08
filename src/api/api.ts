import axios from 'axios';
import {OrderFilterType} from '../components/header/Header.tsx';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes/'
})

export const api = {
    getBooks(term: string) {
        return instance.get(``, {params: {q: term, subject: 'history', maxResults: 8}}).then(res => res.data)
        // ?q=${searchTerm}+subject:${category} для фильтрации по категориям
    },
    getBook(id: string) {
        return instance.get(`${id}`).then(res => res.data)
    },
    changeFilter(term: string, newFilterValue: OrderFilterType = 'relevance') {
        return instance.get(``, {params: {q: term, orderBy: newFilterValue, maxResults: 8}}).then(res => res.data)
    },
    loadMoreBooks(term: string, startIndex: number) {
        return instance.get('', {params: {q: term, maxResults: 30, startIndex}}).then(res => res.data)
    }
}