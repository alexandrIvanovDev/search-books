import {RxCross2} from 'react-icons/rx';
import {AiOutlineSearch} from 'react-icons/ai';
import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from './SearchInput.module.css'
import clsx from 'clsx';
import {FiAlertCircle} from 'react-icons/fi';
import {useLocation, useNavigate} from 'react-router-dom';
import {getBooksThunk} from '../../store/reducers/booksReducer.ts';
import {AppDispatch} from '../../store/store.ts';

export const SearchInput = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch<AppDispatch>()

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

        dispatch(getBooksThunk(value))

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

    useEffect(() => {
        // if (location.pathname !== '/') { TODO
        //     clearInput()
        // }
    }, [location.pathname]);

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