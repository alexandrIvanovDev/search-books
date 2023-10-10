import s from './Header.module.scss';
import { SearchInput } from '../searchInput/SearchInput.tsx';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store.ts';
import { Link, useLocation } from 'react-router-dom';
import { fetchBooks } from '../../store/reducers/booksReducer.ts';
import { Filter } from '../filter/Filter.tsx';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';

export type OrderFilterType = 'relevance' | 'newest';

export type OptionType = {
  value: OrderFilterType | string;
  label: string;
};

export const Header = () => {
  const { orderBy, category } = useTypedSelector((state) => state.filter);
  const [value, setValue] = useState('');

  const location = useLocation();

  const dispatch = useAppDispatch();

  const sortOptions: Array<OptionType> = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
  ];

  const categoriesOptions: Array<OptionType> = [
    { value: 'all', label: 'All' },
    { value: 'art', label: 'Art' },
    { value: 'biography', label: 'Biography' },
    { value: 'computers', label: 'Computers' },
    { value: 'history', label: 'History' },
    { value: 'medical', label: 'Medical' },
    { value: 'poetry', label: 'Poetry' },
  ];

  const searchBooks = () => {
    dispatch(fetchBooks({ term: value, orderBy, category }));
  };

  return (
    <div className={s.header}>
      <div className={s.content}>
        <h1 className={s.title}>
          <Link to='/'>Search for books</Link>
        </h1>
        {location.pathname === '/' && (
          <div className={s.filterBlock}>
            <SearchInput
              value={value}
              setValue={setValue}
              searchBooks={searchBooks}
            />

            <Filter
              orderByFilter={orderBy}
              categoryFilter={category}
              value={value}
              orderByOptions={sortOptions}
              categoriesOptions={categoriesOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};
