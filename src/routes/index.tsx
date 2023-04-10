import { useRoutes } from "react-router-dom"
import Register from "../screens/unauthenticated/register"

const Router = () => {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'cadastro',
          element: (
            <Register />
          )
        }
      ]
    }
  ])
}

export default Router