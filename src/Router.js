import { createBrowserRouter, Navigate } from 'react-router-dom';

import Search from './Pages/Search';
import Home from './Pages/Home';
import Reservation from './Pages/Reservation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/search' />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/reservations',
    element: <Reservation />,
  },
]);

export default router;
