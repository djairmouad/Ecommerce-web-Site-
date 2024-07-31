
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {QueryClientProvider}from "@tanstack/react-query"
import {Provider} from "react-redux"
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories ,{ loader as loaderCategories}from './pages/Categories'
import store from '../store'
import Login, { action as loginAction } from './pages/Login'
import Error from './Components/Error'
import { queryClient } from './util/http'
import Admins ,{loader as loaderAdmines} from './pages/Admins'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Logout, { loader as loaderLogout } from './pages/Logout'
import SignUp, { action as actionSignUp } from './pages/SignUp'
import SideBar,{ loader as loaderProfile } from './root/SideBar'
import NavBar from './root/Navbar'
import Home from './pages/User/Home'
import ProductUser,{loader as loaderProductUser} from './pages/User/ProductUser'
import CategoryUser from './pages/User/CategoryUser'
import CategoriesID , {loader as loaderCategoriesId} from './pages/User/CategoriesID'
import AllProducts from './pages/User/AllProducts'
import CartUser from './pages/User/CartUser'
import Account , {action as SettingsAction} from './pages/User/Account'
import SearchPage from './pages/User/SearchPage'

const router=createBrowserRouter([
  {path:"/",errorElement:<Error/>,children:[
    {index:true,element:<Login/>,action:loginAction},
    {path:"SignUp",element:<SignUp/>,action: actionSignUp},
    {path:"admin",element:<SideBar/>,loader:loaderProfile,children:[
    {path:"dashboard",element:<Dashboard/>},
    {path:"Categories",element:<Categories/>,loader:loaderCategories},
    {path:"product",element:<Products/>,loader:loaderCategories},
    {path:"admins",element:<Admins/> ,loader:loaderAdmines},
    {path:"orders",element:<Orders/>},
    {path:"settings",element:<Settings/>,loader:loaderProfile},
    {path:"logout",element:<Logout/>,loader:loaderLogout}
  ] },
    {path:"user",element:<NavBar/>,children:[
      {path:"home",element:<Home/>},
      {path:"product/:id",element:<ProductUser/>,errorElement:<Error/>,loader:loaderProductUser},
      {path:"categories",element:<CategoryUser/>},
      {path:"categories/:id",element:<CategoriesID/>, loader:loaderCategoriesId},
      {path:"allProduct",element:<AllProducts/>},
      {path:"cartUser", element:<CartUser/>,loader:loaderProfile},
      {path:"account", element:<Account/>,loader:loaderProfile,action:SettingsAction},
      {path:"search",element:<SearchPage/>}
    ]},
  ]},
])
function App() {
   
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}><RouterProvider router={router}/></Provider>
    </QueryClientProvider>
     
  )
}

export default App
