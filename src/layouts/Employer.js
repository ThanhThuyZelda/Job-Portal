import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import EmployerNavbar from "components/Navbars/EmployerNavbar.js";
import EmployerFooter from "components/Footers/EmployerFooter.js";
import Sidebar from "components/Sidebar/EmployerSidebar.js";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import routes from "routesEmployer.js";

const Employer = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/nha-tuyen-dung") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const navigate = useNavigate();
  useEffect(() => {
    let local = sessionStorage.getItem('token');
    if (!local) {
      navigate("/employer/dang-nhap");
    }
  })

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/nha-tuyen-dung/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <EmployerNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/nha-tuyen-dung/index" replace />} />
        </Routes>
        <Container fluid>
          <EmployerFooter />
        </Container>
      </div>
    </>
  );
};

export default Employer;
