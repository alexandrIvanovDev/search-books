import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots color={'#44a0c2'} />
    </div>
  );
};
