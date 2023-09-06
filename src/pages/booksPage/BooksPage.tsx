import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {Book} from '../../components/book/Book.tsx';
import s from './BooksPage.module.css'
import {Loader} from '../../components/loader/Loader.tsx';


export const BooksPage = () => {
    const {items, totalItems, isLoading} = useSelector((state: RootState) => state.books)

    return (
        <div className={s.container}>
            {isLoading && <Loader />}
            {totalItems !== 0 && <h3 className={s.result}>Found {totalItems} results</h3>}
            <div className={s.books}>
                {items
                    ? items.map(b => <Book book={b} key={b.id}/>)
                    : <h2>Books not found</h2>
                }
            </div>
        </div>
    )
}