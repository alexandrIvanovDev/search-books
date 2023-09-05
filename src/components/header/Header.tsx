import s from './Header.module.css'
import {useState, KeyboardEvent} from 'react';
import {api} from '../../api/api.ts';
import {useDispatch} from 'react-redux';
import {getBooks} from '../../store/reducers/booksReducer.ts';

export const Header = () => {
    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const searchBooks = async () => {
        const res = await api.searchBooks(value)
        dispatch(getBooks(res))
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchBooks()
        }
    }
    return (
        <div className={s.wrapper}>
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={onEnterHandler}
            />
            <button onClick={searchBooks}>Search</button>
        </div>
    )
}