import { useNavigate, useRouteError } from 'react-router-dom';
import s from './ErrorPage.module.scss';
import { Button } from '../../components/button/Button.tsx';

export const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className={s.error}>
      <div className={s.wrapper}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button onClick={() => navigate('/')}>Back</Button>
      </div>
    </div>
  );
};
