import { createBrowserRouter, RouterProvider,  } from 'react-router-dom';
import './App.css';
import Login from './features/auth/Login/Login';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/store';
import SingleFilm from './components/SingleFilm/SingleFilm';
import MainPage from './components/Home/MainPage';
import HomeLayout from './components/Home/HomeLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/home',
      element: <HomeLayout />,  
      children: [
        {
          path: '', 
          element: <MainPage />  
        },
        {
          path: ':id',  
          element: <SingleFilm />
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
export default App;
