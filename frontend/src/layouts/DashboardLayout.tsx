import { Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div className="flex min-h-screen  p-4">

      <aside className="flex flex-col self-start h-fit">
        <nav className="flex flex-col gap-4 p-4 ">
          <a className="bg-gray-200  text-center text-lg font-bold p-2" href="/dashboard">Dashboard</a>
          <a className="bg-gray-200  text-center text-lg font-bold p-2" href="/events">Events</a>
          <a className="bg-gray-200  text-center text-lg font-bold p-2" href="/incidents">Incidents</a>
          <a className="bg-gray-200  text-center text-lg font-bold p-2" href="/users">Users</a>
        </nav>
      </aside>

        <main className="flex flex-1 justify-center p-4">
             <Outlet />
             </main>
    </div>
  )
}

export default DashboardLayout
