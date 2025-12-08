import { Link } from 'react-router-dom'
import { RouteConstants } from '../../constants/RouteConstants'

const DashboardLayout = (props:any) => {
  return (
    <main className="flex flex-row w-full">
      <div className="sidebar bg-amber-300 w-1/4 text-left p-5 h-screen flex flex-col gap-2">
        
          {/* <li>
            <span>Icon</span>
            <span>Dashboard</span>
            </li>
          <li>
            <span>Icon</span>
            <span>Dashboard</span>
            </li> */}
          <Link to="/">
            <span>Ic-</span>
            <span>Dashboard</span>
          </Link>
          <Link to={RouteConstants.CATEGORIES}>
            <span>Ic-</span>
            <span>Categories</span>
          </Link>
          <Link to="/">
            <span>Ic-</span>
            <span>SubCategories</span>
          </Link>
        
      </div>
      <div className="container bg-amber-200">
        {props.children}
      </div>



    </main>
  )
}

export default DashboardLayout