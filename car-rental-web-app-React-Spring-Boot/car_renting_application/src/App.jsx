import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import AddVehicle from "./pages/AddVehicle";
import Cars from "./pages/Cars";
import RentCar from "./pages/RentCar";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Map from "./components/Map";
import MyBookings from "./components/MyBookings";
import MyCars from "./components/MyCars";

import { CarProvider } from "./contexts/CarContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RentalProvider } from "./contexts/RentalContext";
import FullMap from "./components/FullMap";
import MyRentals from "./components/MyRentals";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Admin from "./pages/Admin";
import DashBoard from "./components/DashBoard";
import NewVehicles from "./components/NewVehicles";

export default function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <AuthProvider>
          <CarProvider>
            <RentalProvider>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="login" element={<Login />} />

                <Route
                  path="addvehicle"
                  element={
                    <ProtectedRoute>
                      <AddVehicle />
                    </ProtectedRoute>
                  }
                >
                  <Route path="map" element={<Map />}></Route>
                </Route>

                <Route
                  path="/cars"
                  element={
                    <ProtectedRoute>
                      <Cars />
                    </ProtectedRoute>
                  }
                >
                  <Route path="map" element={<FullMap />} />
                </Route>

                <Route
                  path="rentcar/:id"
                  element={
                    <ProtectedRoute>
                      <RentCar />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                >
                  {/* <Route index element={<UserDetails />} /> */}
                  <Route index element={<MyBookings />} />
                  <Route path="mycars" element={<MyCars />} />
                  <Route path="myrentals" element={<MyRentals />} />
                </Route>

                <Route
                  path="test"
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/admin" element={<Admin />}>
                  <Route index element={<DashBoard />} />
                  <Route path="newVehicles" element={<NewVehicles />} />
                </Route>
              </Routes>
            </RentalProvider>
          </CarProvider>
        </AuthProvider>
      </FirebaseProvider>
    </BrowserRouter>
  );
}
