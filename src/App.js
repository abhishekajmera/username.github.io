import { RouterProvider } from 'react-router-dom';
import router from './Router';

import NavbarComponent from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
