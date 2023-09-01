import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Celulares from "./components/Crud/CelularesCrud";
import Juegos from "./components/Crud/JuegosCrud";
import { Children } from "react";
import "./app.scss";

const Layout = () => {
  return (
    <div className="app">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter ([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Celulares/>
      },
      {
        path:"/celulares",
        element:<Celulares/>
      },
      {
        path:"/juegos",
        element:<Juegos/>
      }
    ]
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;