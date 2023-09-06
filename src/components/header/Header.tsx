import s from './Header.module.css'
import {SearchInput} from '../searchInput/SearchInput.tsx';

export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.content}>
                <h1 className={s.title}>Search for books</h1>
                <SearchInput />
            </div>
        </div>
    )
}