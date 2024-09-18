import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login/Login';
import Home from './features/Home';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home/>
    }
  ])
  return (
  
     <RouterProvider router={router}/>
  );
}

export default App
