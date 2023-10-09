import { BookType } from '../../store/reducers/booksReducer.ts';
import { FC } from 'react';
import s from './Book.module.scss';
import bookImg from '../../assets/book.jpeg';
import { Link } from 'react-router-dom';

type PropsType = {
  book: BookType;
};

export const Book: FC<PropsType> = ({ book }) => {
  return (
    <Link to={`/${book.id}`} className={s.content}>
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || bookImg}
        alt='bookImg'
        className={s.img}
      />
      <div className={s.information}>
        <div className={s.categories}>
          {book.volumeInfo.categories && book.volumeInfo.categories[0]}
        </div>
        <div className={s.titleWrapper}>
          <div
            className={s.title}
            data-tooltip={book.volumeInfo.title}
            title={book.volumeInfo.title}
          >
            {book.volumeInfo.title}
          </div>
        </div>
        <div className={s.authors} title={book.volumeInfo.authors?.join('')}>
          {book.volumeInfo.authors}
        </div>
      </div>
    </Link>
  );
};
