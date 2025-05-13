import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/auth/pages/host/dashboard/Dashboard";
import PrivateRoutes from "./features/auth/PrivateRoutes";
import MyHotels from "./features/auth/pages/host/dashboard/my_hotels/MyHotels";
import BasicInfo from "./features/auth/pages/host/CreateHotel/BasicInfo";
import RoomConfiguration from "./features/auth/pages/host/CreateHotel/RoomConfiguration";
import PhotosAndMedia from "./features/auth/pages/host/CreateHotel/PhotosAndMedia";
import PricingAndAvailability from "./features/auth/pages/host/CreateHotel/PricingAndAvailability";
import Policies from "./features/auth/pages/host/CreateHotel/Policies";
import ReviewAndSubmit from "./features/auth/pages/host/CreateHotel/ReviewAndSubmit";

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
          path="/host/create-hotel/basic-info"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <BasicInfo />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/room-configuration"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <RoomConfiguration />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/photos-and-media"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <PhotosAndMedia />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/pricing-and-availability"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <PricingAndAvailability />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/policies"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <Policies />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/create-hotel/review-and-submit"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <ReviewAndSubmit />
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
