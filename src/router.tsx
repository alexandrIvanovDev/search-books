import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { BooksPage } from './pages/booksPage/BooksPage.tsx';
import { BookCardPage } from './pages/bookCardPage/BookCardPage.tsx';
import { ErrorPage } from './pages/errorPage/ErrorPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BooksPage />,
  },
  {
    path: '/:id',
    element: <BookCardPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
