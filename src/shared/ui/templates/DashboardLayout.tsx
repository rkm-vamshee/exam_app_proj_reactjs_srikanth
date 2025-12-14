import { Link } from 'react-router-dom'
import { RouteConstants } from '../../constants/RouteConstants'

const DashboardLayout = (props: any) => {

  const sidebarLinks = [
    { linkLabel: "Dashboard", routeLink: RouteConstants.DASHBOARD, icon: "" },
    { linkLabel: "Categories", routeLink: RouteConstants.CATEGORIES, icon: "" },
    { linkLabel: "Subcategories", routeLink: RouteConstants.SUB_CATEGORIES, icon: "" },
    { linkLabel: "Questions", routeLink: RouteConstants.QUESTIONS, icon: "" },
  ]

  return (
    <main className="flex flex-row w-full">
      <div className="sidebar bg-amber-300 w-1/4 text-left p-5 h-screen flex flex-col gap-2">
      
        {sidebarLinks.map((s: any, index: number) => (<Link key={"link_" + index} to={s.routeLink}>
          {/* <span>Ic-</span> */}
          <span>{s.linkLabel}</span>
        </Link>))}


      </div>
      <div className="container border p-3">
        {props.children}
      </div>



    </main>
  )
}

export default DashboardLayout