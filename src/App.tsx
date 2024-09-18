import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login/Login';
import Home from './features/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    <>
     <RouterProvider router={router}/>
     <ToastContainer/>
    </>
  );
}

export default App
