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

import Profile from "views/Employer/Profile.js";
import Register from "views/examples/Register.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import EmployerPost from "views/Employer/Post/EmployerPost.js";
import EmployerCompany from "views/Employer/Company/EmployerCompany.js";
import AddNewPost from "views/Employer/Post/AddNewPost.js";
import Chatbot1 from "views/Employer/Chatbot1/Chatbot.js";
var routes = [
  {
    path: "/index",
    name: "Thống kê",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/nha-tuyen-dung",
  },
  {
    path: "/bai-tuyen-dung",
    name: "Chiến dịch tuyển dụng",
    icon: "ni ni-money-coins",
    component: <EmployerPost />,
    layout: "/nha-tuyen-dung",
  },
  {
    path: "/bai-dang",
    name: "Tạo bài đăng",
    icon: "ni ni-paper-diploma",
    component: <AddNewPost />,
    layout: "/nha-tuyen-dung",
  },
  // {
  //   path: "/dang-nhap",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <EmployerLogin />,
  //   layout: "/employer",
  // },
  {
    path: "/cong-ty",
    name: "Thông tin công ty",
    icon: "ni ni-building",
    component: <EmployerCompany />,
    layout: "/nha-tuyen-dung",
  },

  {
    path: "/user-profile",
    name: "Thông tin cá nhân",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/nha-tuyen-dung",
  },
  // {
  //   path: "/chat-bot",
  //   name: "Chatbot",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Chatbot />,
  //   layout: "/nha-tuyen-dung",
  // },
  // {
  //   path: "/chat-bot1",
  //   name: "Chatbot1",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Chatbot1 />,
  //   layout: "/nha-tuyen-dung",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },

];
export default routes;
