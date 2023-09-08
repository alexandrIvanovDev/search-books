import {useNavigate} from 'react-router-dom';
import {BookType} from '../../store/reducers/booksReducer.ts';
import {FC} from 'react';
import s from './BookCard.module.css'
import bookImg from '../../assets/book.jpeg'

type PropsType = {
    book: BookType
}

export const BookCard: FC<PropsType> = ({book}) => {
    const navigate = useNavigate()
    return (
        <>
            <div className={s.imgWrapper}>
                <img src={book.volumeInfo.imageLinks.medium || bookImg} alt="img" className={s.img}/>
            </div>
            <div className={s.information}>
                <div className={s.categories}>{book.volumeInfo.categories}</div>
                <h3 className={s.title}>{book.volumeInfo.title}</h3>
                <div className={s.authors}>{book.volumeInfo.authors?.join(', ')}</div>
                <div className={s.description}>{book.volumeInfo.description}</div>
                <div className={s.footerBlock}>
                    <div>Pages count: {book.volumeInfo.pageCount}</div>
                    <button onClick={() => navigate(-1)} className={s.button}>Back</button>
                </div>
            </div>
        </>
    )
}