import {BookType} from '../../store/reducers/booksReducer.ts';
import {FC} from 'react';
import s from './Book.module.css'
import bookImg from '../../assets/book.jpeg'
import {Link} from 'react-router-dom';

type PropsType = {
    book: BookType
}

export const Book: FC<PropsType> = ({book}) => {
    return (
        <div className={s.content}>
            <Link to={`/${book.id}`}>
                <img src={book.volumeInfo.imageLinks?.thumbnail || bookImg} alt="bookImg" className={s.img}/>
            </Link>
            <div className={s.information}>
                <div className={s.categories}>{book.volumeInfo.categories && book.volumeInfo.categories[0]}</div>
                <div className={s.titleWrapper}>
                    <Link to={`/${book.id}`}
                          className={s.title}
                          data-tooltip={book.volumeInfo.title}
                          title={book.volumeInfo.title}
                          style={{color: 'black', textDecoration: 'none'}}
                    >
                        {book.volumeInfo.title}
                    </Link>
                </div>
                <div className={s.authors} title={book.volumeInfo.authors?.join('')}>{book.volumeInfo.authors}</div>
            </div>
        </div>
    )
}