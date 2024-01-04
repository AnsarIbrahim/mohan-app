import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCard from './components/User/LoginCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddCustomers from './components/Dashboard/Customers/AddCustomers';
import GetCustomer from './components/Dashboard/Customers/GetCustomer';
import CustomerForm from './components/Dashboard/Customers/CustomerForm';
import EditCustomerDetails from './components/Dashboard/Customers/EditCustomerDetails';
import ProtectedRoute from './components/User/ProductedRoute';

function App() {
  return (
    <div className="bg-slate-400">
      <Router>
        <Routes>
          <Route path="/" element={<LoginCard />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-customers"
            element={
              <ProtectedRoute>
                <AddCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/getCustomer"
            element={
              <ProtectedRoute>
                <GetCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-form"
            element={
              <ProtectedRoute>
                <CustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-customer-detail/:customerId/:detailId"
            element={
              <ProtectedRoute>
                <EditCustomerDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
