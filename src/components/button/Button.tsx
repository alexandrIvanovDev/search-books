import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

type ButtonProps = {
  addClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const { addClass, children, ...rest } = props;

  return (
    <button className={clsx(s.btn, addClass)} {...rest}>
      {children}
    </button>
  );
};
