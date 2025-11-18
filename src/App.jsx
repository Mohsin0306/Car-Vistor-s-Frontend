import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Payment from './Pages/Payment'
import Register from './Pages/Register'
import Login from './Pages/Login'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import UserDashboard from './Dashboards/User/User_dashboard'
import Notifications from './Pages/Notifications'
import AdminDashboard from './Dashboards/Admin/Dashboard'
import AdminNotifications from './Pages/AdminNotifications'
import Requests from './Pages/Requests'
import VINRequestDetail from './Pages/VINRequestDetail'
import AdminRequests from './Pages/AdminRequests'
import AdminUsers from './Pages/AdminUsers'
import AdminReports from './Pages/AdminReports'
import ReportDetail from './Pages/ReportDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/report/:vin" element={<ReportDetail />} />
        <Route path="/admin/request/:id" element={<VINRequestDetail />} />
      </Routes>
    </Router>
  )
}

export default App
