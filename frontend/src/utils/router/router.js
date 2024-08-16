import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../../screens/Home";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import page_routes from "./pageMapper";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={page_routes.SIGNUP_PAGE} element={<Signup />} />
        <Route path={page_routes.LOGIN_PAGE} element={<Signin />} />
        <Route path={page_routes.HOME_PAGE} element={<Home />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
