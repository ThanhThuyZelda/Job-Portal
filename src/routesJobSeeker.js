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
import Chatbot from "views/Employer/Chatbot2/Chatbot.js";
import Chatbot1 from "views/Employer/Chatbot1/Chatbot.js";
var routes = [
    // {
    //     path: "/index",
    //     name: "Thống kê",
    //     icon: "ni ni-tv-2 text-primary",
    //     component: <Index />,
    //     layout: "/nha-tuyen-dung",
    // },
    {
        path: "/index",
        name: "Thống kê",
        icon: "ni ni-tv-2 text-primary",
        component: <Index />,
        layout: "/nha-tuyen-dung",
    },

];
export default routes;
