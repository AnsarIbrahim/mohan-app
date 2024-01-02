import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/User/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        {/* other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
