import { ChangeEvent, FC } from 'react';
import { useAppDispatch } from '../../store/store.ts';
import {
  changeCategory,
  setOrder,
} from '../../store/reducers/filterReducer.ts';
import { fetchBooks } from '../../store/reducers/booksReducer.ts';
import { OptionType, OrderFilterType } from '../header/Header.tsx';
import s from './Filter.module.scss';
import { Select } from '../select/Select.tsx';

type PropsType = {
  orderByFilter: OrderFilterType;
  categoryFilter: string;
  value: string;
  orderByOptions: Array<OptionType>;
  categoriesOptions: Array<OptionType>;
};
export const Filter: FC<PropsType> = (props) => {
  const {
    orderByFilter,
    orderByOptions,
    value,
    categoryFilter,
    categoriesOptions,
  } = props;

  const dispatch = useAppDispatch();

  const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrder(e.currentTarget.value as OrderFilterType));
    dispatch(
      fetchBooks({
        term: value,
        orderBy: e.currentTarget.value as OrderFilterType,
        category: categoryFilter,
      })
    );
  };

  const onChangeCategoriesFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCategory(e.currentTarget.value));
    dispatch(
      fetchBooks({
        term: value,
        orderBy: orderByFilter,
        category: e.currentTarget.value,
      })
    );
  };

  return (
    <div className={s.content}>
      <Select
        defaultOption='Sorting by'
        filter={orderByFilter}
        changeFilter={onChangeFilter}
        value={value}
        option={orderByOptions}
      />

      <Select
        defaultOption='Categories'
        filter={categoryFilter}
        changeFilter={onChangeCategoriesFilter}
        value={value}
        option={categoriesOptions}
        addClass={s.categorySelect}
      />
    </div>
  );
};
