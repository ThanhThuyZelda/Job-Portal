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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AdminCity from "views/Admin/City/AdminCity.js";
import AdminPostion from "views/Admin/Position/AdminPosition.js";
import AdminSkill from "views/Admin/Skill/AdminSkill.js";
import AdminEmployer from "views/Admin/Employer/AdminEmployer.js"
import AdminJobSeeker from "views/Admin/JobSeeker/AdminJobSeeker.js"
import AdminLogin from "views/Admin/Login Signup Logout/AdminLogin.js";


var routes = [
  {
    path: "/index",
    name: "Thống kê",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/nha-tuyen-dung",
    name: "Danh sách nhà tuyển dụng",
    icon: "ni ni-money-coins",
    component: <AdminEmployer />,
    layout: "/admin",
  },
  {
    path: "/nguoi-tim-viec",
    name: "Danh sách nhà người tìm việc",
    icon: "ni ni-money-coins",
    component: <AdminJobSeeker />,
    layout: "/admin",
  },
  {
    path: "/thanh-pho",
    name: "Danh sách thành phố",
    icon: "ni ni-building",
    component: <AdminCity />,
    layout: "/admin",
  },
  {
    path: "/vi-tri",
    name: "Danh sách vị trí",
    icon: "ni ni-ungroup",
    component: <AdminPostion />,
    layout: "/admin",
  },
  {
    path: "/ky-nang",
    name: "Danh sách kỹ năng",
    icon: "ni ni-book-bookmark",
    component: <AdminSkill />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <AdminLogin />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
