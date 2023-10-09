import s from './Header.module.css';
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
  name: string;
};

export const Header = () => {
  const { orderBy, category } = useTypedSelector((state) => state.filter);
  const [value, setValue] = useState('');

  const location = useLocation();

  const dispatch = useAppDispatch();

  const sortOptions: Array<OptionType> = [
    { value: 'relevance', name: 'Relevance' },
    { value: 'newest', name: 'Newest' },
  ];

  const categoriesOptions: Array<OptionType> = [
    { value: 'all', name: 'All' },
    { value: 'art', name: 'Art' },
    { value: 'biography', name: 'Biography' },
    { value: 'computers', name: 'Computers' },
    { value: 'history', name: 'History' },
    { value: 'medical', name: 'Medical' },
    { value: 'poetry', name: 'Poetry' },
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
