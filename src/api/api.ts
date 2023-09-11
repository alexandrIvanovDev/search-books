import axios from 'axios';
import {OrderFilterType} from '../components/header/Header.tsx';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/'
})

const key = import.meta.env.VITE_API_KEY

export const api = {
    async fetchBooks(term: string, newFilterValue: OrderFilterType = 'relevance', category: string) {
        const categories = category !== 'all' ? `+subject:${category}` : ''

        const res = await instance.get(`volumes?q=${term}${categories}`, {
            params: {
                orderBy: newFilterValue,
                maxResults: 8,
                key
            }
        });
        return res.data;
    },
    async getBook(id: string) {
        const res = await instance.get(`volumes/${id}`, {params: {key}});
        return res.data;
    },
    async loadMoreBooks(term: string, startIndex: number) {
        const res = await instance.get('volumes?', {params: {q: term, maxResults: 30, startIndex, key}});
        return res.data;
    }
}