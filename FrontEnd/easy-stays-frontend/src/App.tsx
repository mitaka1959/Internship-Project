import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/auth/pages/host/dashboard/Dashboard";
import PrivateRoutes from "./features/auth/PrivateRoutes";
import MyHotels from "./features/auth/pages/host/dashboard/my_hotels/MyHotels";
import CreateHotelPage from "./features/auth/pages/host/CreateHotel/CreateHotelPage";
import EditHotel from "./features/auth/pages/host/dashboard/my_hotels/EditHotel/EditHotel";
import RoomEditPage from "./features/auth/pages/host/dashboard/my_hotels/EditHotel/RoomEdit";
import SearchPage from "./features/auth/pages/user/SearchPage";
import HotelPage from "./features/auth/pages/user/HotelPage";
import ReservationPage from "./features/auth/pages/user/ReservationPage";
import Reservations from "./features/auth/pages/host/dashboard/my_hotels/EditHotel/Reservations";
import UserProfilePage from "./features/auth/pages/user/UserProfilePage";

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
          path="/host/my_hotels/edit-hotel/:hotelId"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <EditHotel />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/edit-room/:roomId"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <RoomEditPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/host/reservations"
          element={
            <PrivateRoutes allowedRoles={["Host", "Admin"]}>
              <Reservations />
            </PrivateRoutes>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hotel-page/:id" element={<HotelPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />

        <Route
          path="*"
          element={<div style={{ padding: "2rem" }}>Welcome to EasyStays</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
