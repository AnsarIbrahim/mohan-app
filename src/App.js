import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCard from './components/User/LoginCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddCustomers from './components/Dashboard/Customers/AddCustomers';
import GetCustomer from './components/Dashboard/Customers/GetCustomer';
import CustomerDetails from './components/Dashboard/Customers/CustomerDetails';
import View from './components/Dashboard/Customers/View';
import ViewFullDetails from './components/Dashboard/Customers/ViewFullDetails';
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
            path="/customer-details/:customerId/:detailId"
            element={
              <ProtectedRoute>
                <CustomerDetails />
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
          <Route
            path="/view/:customerId/:detailId"
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-full-details/:customerId"
            element={
              <ProtectedRoute>
                <ViewFullDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
