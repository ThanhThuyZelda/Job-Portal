/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import AdminLayout from "layouts/Admin.js";
import EmployerLayout from "layouts/Employer.js";
import AuthLayout from "layouts/Auth.js";
import AuthEmployerLayout from "layouts/AuthEmployer.js";
import RegisterEmployerLayout from "layouts/RegisterEmployer.js";

const root = ReactDOM.createRoot(document.getElementById("root"));




root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/login" element={<AuthLayout />} />

      <Route path="/nha-tuyen-dung/*" element={<EmployerLayout />} />
      <Route path="/employer/dang-nhap*" element={<AuthEmployerLayout />} />
      <Route path="/employer/dang-ky*" element={<RegisterEmployerLayout />} />


      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  </BrowserRouter>
);
