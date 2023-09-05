import {useNavigate} from 'react-router-dom';
import {BookType} from '../../store/reducers/booksReducer.ts';
import {FC} from 'react';
import s from './BookItem.module.css'

type PropsType = {
    book: BookType
}

export const BookItem: FC<PropsType> = ({book}) => {
    const navigate = useNavigate()
    return (
        <>
            <div className={s.imgWrapper}>
                <img src={book.volumeInfo.imageLinks.medium} alt="img" className={s.img}/>
            </div>
            <div className={s.information}>

                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </>
    )
}