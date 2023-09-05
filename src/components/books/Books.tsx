import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {Book} from '../book/Book.tsx';
import s from './Books.module.css'


export const Books = () => {
    const books = useSelector((state: RootState) => state.books.items)

    console.log(books)

    return (
        <div className={s.container}>
            {books.map(b => <Book book={b} key={b.id}/>)}
        </div>
    )
}