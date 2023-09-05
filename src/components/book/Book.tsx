import {BookType} from '../../store/reducers/booksReducer.ts';
import {FC} from 'react';
import s from './Book.module.css'
import bookImg from '../../assets/book.jpeg'

type PropsType = {
    book: BookType
}

export const Book: FC<PropsType> = ({book}) => {
    return (
        <div className={s.content}>
            <img src={book.volumeInfo.imageLinks?.thumbnail || bookImg} alt="" className={s.img}/>
            <div className={s.information}>
                <div className={s.categories}>{book.volumeInfo.categories}</div>
                <div className={s.titleWrapper}>
                    <div className={s.title} data-tooltip={book.volumeInfo.title}>{book.volumeInfo.title}</div>
                </div>
                <div className={s.authors}>{book.volumeInfo.authors}</div>
            </div>
        </div>
    )
}