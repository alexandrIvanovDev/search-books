import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookType } from '../../store/reducers/booksReducer.ts';
import { api } from '../../api/api.ts';
import { useFetching } from '../../hooks/useFetching.ts';
import s from './BookCardPage.module.css';
import { Loader } from '../../components/loader/Loader.tsx';
import bookImg from '../../assets/book.jpeg';

export const BookCardPage = () => {
  const [book, setBook] = useState<BookType>();
  const { id } = useParams();
  const navigate = useNavigate();

  const [getBook, isLoading, error] = useFetching(async () => {
    if (id) {
      const res = await api.getBook(id);
      setBook(res);
    }
  });

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className={s.content}>
      {error && <div>Error: {error}</div>}
      {isLoading ? (
        <Loader />
      ) : (
        book && (
          <div className={s.book}>
            <div className={s.imgWrapper}>
              <img
                src={book.volumeInfo.imageLinks?.medium || bookImg}
                alt='img'
                className={s.img}
              />
            </div>
            <div className={s.information}>
              <div className={s.categories}>{book.volumeInfo.categories}</div>
              <h3 className={s.title}>{book.volumeInfo.title}</h3>
              <div className={s.authors}>
                {book.volumeInfo.authors?.join(', ')}
              </div>
              <div className={s.description}>{book.volumeInfo.description}</div>
              <div className={s.footerBlock}>
                <div>Pages count: {book.volumeInfo.pageCount}</div>
                <button onClick={() => navigate(-1)} className={s.button}>
                  Back
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
