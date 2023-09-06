import s from './Header.module.css'
import {SearchInput} from '../searchInput/SearchInput.tsx';
import {ChangeEvent, FC, useState} from 'react';
import {changeFilterThunk} from '../../store/reducers/booksReducer.ts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store.ts';

export type FilterType = 'relevance' | 'newest'

export type OptionType = {
    value: FilterType
    name: string
}

export const Header = () => {
    const [value, setValue] = useState('')
    const [filter, setFilter] = useState<FilterType>('newest')

    const dispatch = useDispatch<AppDispatch>()

    console.log(filter)

    const option: Array<OptionType> = [
        {value: 'relevance', name: 'Relevance'},
        {value: 'newest', name: 'Newest'}
    ]

    const changeFilter = (newFilterValue: FilterType) => {
        setFilter(newFilterValue)
        console.log(filter)
        dispatch(changeFilterThunk({term: value, filter: filter}))
    }

    return (
        <div className={s.header}>
            <div className={s.content}>
                <h1 className={s.title}>Search for books</h1>
                <div style={{display: 'flex'}}>
                    <SearchInput value={value} setValue={setValue}/>

                    <Filter
                        filter={filter}
                        setFilter={setFilter}
                        changeFilter={changeFilter}
                        value={value}
                        option={option}
                    />
                </div>
            </div>
        </div>
    )
}

type PropsType = {
    filter: FilterType
    setFilter: (filterValue: FilterType) => void
    changeFilter: (value: FilterType) => void
    value: string
    option: Array<OptionType>
}

export const Filter: FC<PropsType> = ({filter, changeFilter, value, option}) => {

    const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        changeFilter(e.currentTarget.value as FilterType)
    }

    console.log(filter)

    return (
        <div>
            <select style={{padding: 5}}
                    value={filter}
                    onChange={onChangeFilter}
                    disabled={value.trim() === ''}
            >
                <option value="" disabled>Order by</option>

                {option.map(o => <option value={o.value} key={o.value}>{o.name}</option>)}

                {/*<option value="relevance">Relevance</option>*/}
                {/*<option value="newest">Newest</option>*/}
            </select>
        </div>
    )
}