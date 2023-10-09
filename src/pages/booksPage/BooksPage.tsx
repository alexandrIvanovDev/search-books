import { useAppDispatch } from '../../store/store.ts';
import { Book } from '../../components/book/Book.tsx';
import s from './BooksPage.module.scss';
import { Loader } from '../../components/loader/Loader.tsx';
import { loadBooksThunk } from '../../store/reducers/booksReducer.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { Button } from '../../components/button/Button.tsx';

export const BooksPage = () => {
  const { items, totalItems, isLoading } = useTypedSelector(
    (state) => state.books
  );

  const dispatch = useAppDispatch();

  const loadBooks = async () => {
    dispatch(loadBooksThunk());
  };

  return (
    <div className={s.container}>
      {isLoading && <Loader />}
      <div>
        {totalItems !== 0 && (
          <h3 className={s.result}>Found {totalItems} results</h3>
        )}
        <div className={s.books}>
          {items ? (
            items.map((b) => <Book book={b} key={b.id} />)
          ) : (
            <h2>Books not found</h2>
          )}
        </div>
        <div className={s.btnWrapper}>
          {totalItems !== 0 && (
            <Button addClass={s.btn} onClick={loadBooks}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
