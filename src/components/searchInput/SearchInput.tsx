import { RxCross2 } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import s from './SearchInput.module.scss';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

type PropsType = {
  value: string;
  setValue: (value: string) => void;
  searchBooks: () => void;
};

export const SearchInput: FC<PropsType> = ({
  value,
  setValue,
  searchBooks,
}) => {
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const clearInput = () => {
    setValue('');
  };

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    setValue(e.currentTarget.value);
  };

  const search = () => {
    if (value.trim() === '') {
      setError('This field is empty');
      return;
    }

    searchBooks();

    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const inputClass = clsx(s.input, error && s.error);
  const icon = clsx(s.searchIcon, error && s.errorMessage);

  return (
    <div className={s.inputWrapper}>
      <input
        type='text'
        placeholder='Search...'
        value={value}
        onChange={onInputHandler}
        onKeyDown={onEnterHandler}
        className={inputClass}
      />
      {error && <div className={s.errorMessage}>{error}</div>}
      {value && <RxCross2 className={s.deleteIcon} onClick={clearInput} />}
      {error ? (
        <FiAlertCircle className={icon} />
      ) : (
        <AiOutlineSearch className={s.searchIcon} onClick={search} />
      )}
    </div>
  );
};
