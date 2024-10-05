import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; // Dodaj import za ToastContainer
import { Provider } from 'react-redux';
import store from './store/store';
import SingleFilm from './components/SingleFilm/SingleFilm';
import MainPage from './components/Home/MainPage';
import HomeLayout from './components/Home/HomeLayout';
import Login from './features/Login';

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
      <ToastContainer 
        position="top-center"  
        autoClose={4000}     
        hideProgressBar={false} 
        newestOnTop={false}  
        closeOnClick          
        pauseOnHover          
        draggable             
        theme="light"         
      />
    </Provider>
  );
}

export default App;
