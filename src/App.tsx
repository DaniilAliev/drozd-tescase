import { Login } from "./pages/Login"
import { MainPage } from "./pages/Main";
import styles from './App.module.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvuder from "./context/AuthProvider";
import GeneralProvider from "./context/GeneralProvider";
import { Test } from "./pages/Test";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/:id',
    element: <Test />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

const App = () => {
  return (
    <GeneralProvider>
      <AuthProvuder>
        <section className={styles.container}>
          <RouterProvider router={router} />
        </section>
      </AuthProvuder>
    </GeneralProvider>
  )
}

export default App
