import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import BookingPage from "./pages/BookingPage/BookingPage";
import { checkLogin } from "./store/slices/user.slice";
import { useAppDispatch } from "./store/store";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AuthWrapper from "./layouts/AuthWrapper";
import Wrapper from "./layouts/Wrapper";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      await dispatch(checkLogin());
    })();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/appointment/schedule" element={<BookingPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <AuthWrapper>
              <Wrapper><Dashboard /></Wrapper>
          </AuthWrapper>
        }
      />
    </Routes>
  );
}

export default App;
