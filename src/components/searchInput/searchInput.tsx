import {RxCross2} from 'react-icons/rx';
import {AiOutlineSearch} from 'react-icons/ai';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {api} from '../../api/api.ts';
import {getBooks} from '../../store/reducers/booksReducer.ts';
import {useDispatch} from 'react-redux';
import s from './searchInput.module.css'
import clsx from 'clsx';
import {FiAlertCircle} from 'react-icons/fi';
import {useLocation, useNavigate} from 'react-router-dom';

export const SearchInput = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const clearInput = () => {
        setValue('')
    }

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setValue(e.currentTarget.value)
    }

    const searchBooks = async () => {
        if (value.trim() === '') {
            setError('This field is empty')
            return
        }
        const res = await api.getBooks(value)
        dispatch(getBooks(res))

        if (location.pathname !== '/') {
            navigate('/')
        }
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchBooks()
        }
    }

    const inputClass = clsx(s.input, error && s.error)
    const icon = clsx(s.searchIcon, error && s.errorMessage)

    return (
        <div className={s.inputWrapper}>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onInputHandler}
                onKeyDown={onEnterHandler}
                className={inputClass}
            />
            {error && <div className={s.errorMessage}>{error}</div>}
            {value && <RxCross2 className={s.deleteIcon} onClick={clearInput}/>}
            {error ? <FiAlertCircle className={icon}/> : <AiOutlineSearch className={s.searchIcon} onClick={searchBooks}/>}
        </div>
    )
}