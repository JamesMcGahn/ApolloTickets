import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import CustomerHome from './pages/CustomerHome';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentHome from './pages/AgentHome';
import MyTickets from './pages/MyTickets';
import ProtectedRoute from './components/utils/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute>
                <AgentHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/dashboard/mytickets"
            element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/dashboard/mytickets/:status"
            element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agent/dashboard/ticket/:id"
            element={
              <ProtectedRoute>
                <Ticket />
              </ProtectedRoute>
            }
          />

          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<>notfound</>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
