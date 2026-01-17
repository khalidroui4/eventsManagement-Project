import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";
import ProtectedRoute from "./Components/common/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideFooterIn = ["/signUp", "/signIn"];
  const shouldHideFooterIn = hideFooterIn.includes(location.pathname);

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/signIn" element={<Signin />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      {!shouldHideFooterIn && <Footer />}
    </>
  );
}

export default App;
