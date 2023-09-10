import s from './Header.module.css'
import {SearchInput} from '../searchInput/SearchInput.tsx';
import {ChangeEvent, FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {Link, useLocation} from 'react-router-dom';
import {changeCategory, setOrder} from '../../store/reducers/filterReducer.ts';
import {fetchBooks} from '../../store/reducers/booksReducer.ts';

export type OrderFilterType = 'relevance' | 'newest'

export type OptionType = {
    value: OrderFilterType | string
    name: string
}

export const Header = () => {
    const {orderBy, category} = useSelector((state: RootState) => state.filter)
    const [value, setValue] = useState('')

    const location = useLocation()

    const dispatch = useDispatch<AppDispatch>()

    const sortOptions: Array<OptionType> = [
        {value: 'relevance', name: 'Relevance'},
        {value: 'newest', name: 'Newest'}
    ]

    const categoriesOptions: Array<OptionType> = [
        {value: 'all', name: 'All'},
        {value: 'art', name: 'Art'},
        {value: 'biography', name: 'Biography'},
        {value: 'computers', name: 'Computers'},
        {value: 'history', name: 'History'},
        {value: 'medical', name: 'Medical'},
        {value: 'poetry', name: 'Poetry'}
    ]

    const searchBooks = () => {
        dispatch(fetchBooks({term: value, orderBy, category}))
    }

    return (
        <div className={s.header}>
            <div className={s.content}>
                <h1 className={s.title}>
                    <Link to="/">Search for books</Link>
                </h1>
                {location.pathname === '/'
                    && <div style={{display: 'flex', marginLeft: 20}}>
                        <SearchInput value={value} setValue={setValue} searchBooks={searchBooks}/>

                        <Filter
                            orderByFilter={orderBy}
                            categoryFilter={category}
                            value={value}
                            orderByOptions={sortOptions}
                            categoriesOptions={categoriesOptions}
                        />
                    </div>}
            </div>
        </div>
    )
}

type PropsType = {
    orderByFilter: OrderFilterType
    categoryFilter: string
    value: string
    orderByOptions: Array<OptionType>
    categoriesOptions: Array<OptionType>
}

export const Filter: FC<PropsType> = (props) => {

    const {orderByFilter, orderByOptions, value, categoryFilter, categoriesOptions} = props

    const dispatch = useDispatch<AppDispatch>()

    const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setOrder(e.currentTarget.value as OrderFilterType))
        dispatch(fetchBooks({term: value, orderBy: e.currentTarget.value as OrderFilterType, category: categoryFilter}))
    }

    const onChangeCategoriesFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeCategory(e.currentTarget.value))
        dispatch(fetchBooks({term: value, orderBy: orderByFilter, category: e.currentTarget.value}))
    }

    return (
        <div style={{marginLeft: 20}}>

            <Select
                defaultOption="Sorting by"
                filter={orderByFilter}
                changeFilter={onChangeFilter}
                value={value}
                option={orderByOptions}
            />

            <Select
                defaultOption="Categories"
                filter={categoryFilter}
                changeFilter={onChangeCategoriesFilter}
                value={value}
                option={categoriesOptions}
            />
        </div>
    )
}

type SelectPropsType = {
    defaultOption: string
    filter: OrderFilterType | string
    changeFilter: (e: ChangeEvent<HTMLSelectElement>) => void
    value: string
    option: Array<OptionType>
}

export const Select: FC<SelectPropsType> = ({defaultOption, filter, changeFilter, option, value}) => {
    return (
        <select className={s.selectSort}
                value={filter}
                onChange={changeFilter}
                disabled={value.trim() === ''}
        >
            <option value="" disabled>{defaultOption}</option>

            {option.map(o => <option value={o.value} key={o.value}>{o.name}</option>)}

        </select>
    )
}