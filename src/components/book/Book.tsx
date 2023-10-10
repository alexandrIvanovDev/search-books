import { BookType } from '../../store/reducers/booksReducer.ts';
import { FC } from 'react';
import s from './Book.module.scss';
import bookImg from '../../assets/book.jpeg';
import { Link } from 'react-router-dom';

type PropsType = {
  book: BookType;
};

export const Book: FC<PropsType> = ({ book }) => {
  const { imageLinks, categories, title, authors } = book.volumeInfo;

  return (
    <Link to={`/${book.id}`} className={s.content}>
      <img
        src={imageLinks?.thumbnail || bookImg}
        alt='bookImg'
        className={s.img}
      />
      <div className={s.information}>
        <div className={s.categories}>{categories && categories[0]}</div>
        <div className={s.titleWrapper}>
          <div className={s.title} data-tooltip={title} title={title}>
            {title}
          </div>
        </div>
        <div className={s.authors} title={authors?.join('')}>
          {authors}
        </div>
      </div>
    </Link>
  );
};
