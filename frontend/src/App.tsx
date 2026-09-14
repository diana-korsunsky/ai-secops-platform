import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import IncidentsPage from './pages/IncidentsPage'
import AlertsPage from './pages/AlertsPage'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
       
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/users" element={<AlertsPage />} />
        </Route>



        


      </Routes>
    </BrowserRouter>
  )
}

export default App
