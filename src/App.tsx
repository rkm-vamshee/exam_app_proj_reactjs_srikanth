import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from './core/auth/Login'
import Login2 from './core/auth/Login2'
import Dashboard from './features/Dashboard'
import NotFound from './core/NotFound'
import { StorageManager } from './shared/StorageManager'
import ListCategories from './features/admin/categories/ListCategories'
import CreateCategory from './features/admin/categories/CreateCategory'
import EditCategory from './features/admin/categories/EditCategory'
import { RouteConstants } from './shared/constants/RouteConstants'


const ProtectedRoute = () => {
  // Logic
  // return <h1>Testing</h1>
  // const isAuthenticated = false;
  // const isAuthenticated = localStorage.getItem('token');

  const isAuthenticated = StorageManager.isAuthenticated();

  // return isAuthenticated?<Outlet/>:<h1>You are unauthorized</h1>
  // return isAuthenticated?<Outlet/>:<Login2/>
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />

}


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

      {/* <Login/> */}
      {/* <Login2/>
      */}
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login2 />} />


          <Route element={<ProtectedRoute />}>

            <Route path={RouteConstants.DASHBOARD} element={<Dashboard />} />
            <Route path={RouteConstants.CATEGORIES}  element={<ListCategories />} />
            <Route path={RouteConstants.CATEGORY_CREATE}  element={<CreateCategory />} />
            <Route path={RouteConstants.CATEGORY_EDIT}  element={<EditCategory />} />
            
          </Route>


          {/* <Route path='/*' element={<NotFound/>}/> */}
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
