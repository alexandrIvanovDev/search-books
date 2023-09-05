import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/'
})

export const api = {
    getBooks(term: string) {
        return instance.get(`volumes`, {params: {q: term, maxResults: 8}}).then(res => res.data)
    },
    getBook(id: string) {
        return instance.get(`volumes/${id}`).then(res => res.data)
    }
}