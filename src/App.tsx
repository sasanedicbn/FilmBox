import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login/Login';
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Login/>
    },
    {
      path:'/home',
      element: <Home/>

    }
  ])
  return (
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  );
}

export default App
