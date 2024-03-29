import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginCard from './components/User/LoginCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddCustomers from './components/Dashboard/Customers/AddCustomers';
import EditCustomer from './components/Dashboard/Customers/EditCustomer';
import GetCustomer from './components/Dashboard/Customers/GetCustomer';
import CustomerDetails from './components/Dashboard/Customers/CustomerDetails';
import View from './components/Dashboard/Customers/View';
import ViewFullDetails from './components/Dashboard/Customers/ViewFullDetails';
import CustomerForm from './components/Dashboard/Customers/CustomerForm';
import EditCustomerDetails from './components/Dashboard/Customers/EditCustomerDetails';
import ProtectedRoute from './components/User/ProductedRoute';
import GetCustomers from './components/Dashboard/Customers/GetCustomers';
import CustomerFullDetails from './components/Dashboard/Customers/CustomerFullDetails';
import TemplateInvoice from './components/Utils/Template/TemplateInvoice';
import AuthContext from './redux/auth/AuthContext';

function App() {
  const [isLoggingOut, _setIsLoggingOut] = useState(false);
  const isLoggingOutRef = useRef(isLoggingOut);

  const setIsLoggingOut = (data) => {
    isLoggingOutRef.current = data;
    _setIsLoggingOut(data);
  };

  useEffect(() => {
    isLoggingOutRef.current = isLoggingOut;
  }, [isLoggingOut]);

  return (
    <AuthContext.Provider value={{ isLoggingOut, setIsLoggingOut }}>
      <div className="bg-zinc-50">
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
              path="/edit-customer/:customerId"
              element={
                <ProtectedRoute>
                  <EditCustomer />
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
              path="/getCustomers"
              element={
                <ProtectedRoute>
                  <GetCustomers />
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
              path="/customer-full-details/:customerId/:detailId"
              element={
                <ProtectedRoute>
                  <CustomerFullDetails />
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
              path="/edit-customer-detail/:customerId/:detailId/:id"
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
            <Route
              path="/template-invoice/:customerId"
              element={
                <ProtectedRoute>
                  <TemplateInvoice />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
