import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {Book} from '../../components/book/Book.tsx';
import s from './BooksPage.module.css'
import {Loader} from '../../components/loader/Loader.tsx';
import buttonStyle from '../../components/bookCard/BookCard.module.css'
import {loadBooksThunk} from '../../store/reducers/booksReducer.ts';


export const BooksPage = () => {
    const {items, totalItems, isLoading} = useSelector((state: RootState) => state.books)
    // const {startIndex, orderBy, term} = useSelector((state: RootState) => state.filter)

    const dispatch = useDispatch<AppDispatch>()

    const loadBooks = async () => {
        dispatch(loadBooksThunk())
    }

    return (
        <div className={s.container}>
            {isLoading
                ? <Loader/>
                : <div>
                    {totalItems !== 0 && <h3 className={s.result}>Found {totalItems} results</h3>}
                    <div className={s.books}>
                        {items
                            ? items.map(b => <Book book={b} key={b.id}/>)
                            : <h2>Books not found</h2>}
                    </div>
                    <div className={s.btnWrapper}>
                        {totalItems !== 0 && <button onClick={loadBooks} className={`${buttonStyle.button} ${s.btn}`}>Load more</button>}
                    </div>
                </div>
            }
        </div>
    )
}