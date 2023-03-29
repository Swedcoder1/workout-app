import { Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./components/loginComponent/Login";
import Dashboard from "./components/dashbordComponents/Dashboard";
import SignUp from "./components/loginComponent/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/navbar/Profile";
import CreateWorkout from "./components/dashbordComponents/CreateWorkout";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="dashboard/create-program"
          element={
            <ProtectedRoutes>
              <CreateWorkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
