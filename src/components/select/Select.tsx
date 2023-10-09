import { ChangeEvent, FC } from 'react';
import s from './Select.module.scss';
import { OptionType, OrderFilterType } from '../header/Header.tsx';
import clsx from 'clsx';

type PropsType = {
  defaultOption: string;
  filter: OrderFilterType | string;
  changeFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  option: Array<OptionType>;
  addClass?: string;
};
export const Select: FC<PropsType> = (props) => {
  const { defaultOption, filter, changeFilter, option, value, addClass } =
    props;
  const selectClass = clsx(s.select, addClass);
  return (
    <select
      className={selectClass}
      value={filter}
      onChange={changeFilter}
      disabled={value.trim() === ''}
    >
      <option value='' disabled>
        {defaultOption}
      </option>

      {option.map((o) => (
        <option value={o.value} key={o.value}>
          {o.name}
        </option>
      ))}
    </select>
  );
};
