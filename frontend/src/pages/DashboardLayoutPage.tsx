

function DashboardLayout() {





  return (
    <div className="flex min-h-screen p-4">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav className="flex flex-col gap-4">
      <a href="/dashboard">Dashboard</a>
      <a href="/events">Events</a>
      <a href="/incidents">Incidents</a>
      <a href="/users">Users</a>
    </nav>



      </aside>

    </div>
  )
}

export default DashboardLayout
