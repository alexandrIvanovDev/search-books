import s from './Header.module.css'
import {SearchInput} from '../searchInput/SearchInput.tsx';
import {ChangeEvent, FC, useState} from 'react';
import {changeFilterThunk} from '../../store/reducers/booksReducer.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {Link} from 'react-router-dom';

export type OrderFilterType = 'relevance' | 'newest'

export type OptionType = {
    value: OrderFilterType
    name: string
}

export const Header = () => {
    const {orderBy} = useSelector((state: RootState) => state.filter)
    const [value, setValue] = useState('')
    // const [filter, setFilter] = useState<OrderFilterType>(orderBy)

    const dispatch = useDispatch<AppDispatch>()

    const option: Array<OptionType> = [
        {value: 'relevance', name: 'Relevance'},
        {value: 'newest', name: 'Newest'}
    ]

    const changeFilter = (newFilterValue: OrderFilterType) => {
        dispatch(changeFilterThunk({term: value, filter: newFilterValue}))
    }

    return (
        <div className={s.header}>
            <div className={s.content}>
                <Link to="/"><h1 className={s.title}>Search for books</h1></Link>
                <div style={{display: 'flex'}}>
                    <SearchInput value={value} setValue={setValue}/>

                    <Filter
                        filter={orderBy}
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
    filter: OrderFilterType
    changeFilter: (value: OrderFilterType) => void
    value: string
    option: Array<OptionType>
}

export const Filter: FC<PropsType> = ({filter, changeFilter, value, option}) => {

    const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        changeFilter(e.currentTarget.value as OrderFilterType)
    }

    return (
        <div style={{marginLeft: 20}}>
            <select style={{padding: 5, cursor: 'pointer'}}
                    value={filter}
                    onChange={onChangeFilter}
                    disabled={value.trim() === ''}
            >
                <option value="" disabled>Order by</option>

                {option.map(o => <option value={o.value} key={o.value}>{o.name}</option>)}

            </select>
        </div>
    )
}