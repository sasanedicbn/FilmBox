import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Login/>
    }
  ])
  return (
  
     <RouterProvider router={router}/>
  );
}

export default App
