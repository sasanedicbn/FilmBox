import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login/Login';
import Home from './components/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/store';
import SingleFilm from './components/SingleFilm/SingleFilm';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Login/>
    },
    {
      path:'/home',
      element: <Home/>

    },
    {
      path:'home/:id',
      element: <SingleFilm/>
    }
  ])
  return (
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  );
}

export default App
