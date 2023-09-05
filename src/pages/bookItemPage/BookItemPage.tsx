import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {BookType} from '../../store/reducers/booksReducer.ts';
import {api} from '../../api/api.ts';
import {useFetching} from '../../hooks/useFetching.ts';
import {BookItem} from '../../components/bookItem/BookItem.tsx';
import s from './BookItemPage.module.css'

export const BookItemPage = () => {
    const [book, setBook] = useState<BookType>()
    const {id} = useParams()

    const [getBook, isLoading, error] = useFetching(async () => {
        if (id) {
            const res = await api.getBook(id)
            setBook(res)
        }
    })

    useEffect(() => {
        getBook()
    }, []);

    return (
        <div className={s.content}>
            {error && <div>Error: {error}</div>}
            {isLoading
                ? <div>Loading...</div>
                : book && <BookItem book={book}/>
            }
        </div>
    )
}