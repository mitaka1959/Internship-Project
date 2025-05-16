import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/auth/pages/host/dashboard/Dashboard";
import PrivateRoutes from "./features/auth/PrivateRoutes";
import MyHotels from "./features/auth/pages/host/dashboard/my_hotels/MyHotels";
import CreateHotelPage from "./features/auth/pages/host/CreateHotel/CreateHotelPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/my_hotels"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <MyHotels />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/create-hotel"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <CreateHotelPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="*"
          element={<div style={{ padding: "2rem" }}>Welcome to EasyStays</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
