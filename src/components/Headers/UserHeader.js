// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
const UserHeader = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState("");
  useEffect(() => {
    axios.get('http://localhost:8080/nha-tuyen-dung/home/session')
      .then(res => {
        console.log(res);
        if (res.data.loggedIn) {
          setName(res.data.employer.fullname);
        }
        else {
          console.log(res.data.loggedIn)
        }
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h4 className="display-4 text-white">{name}</h4>
              <p className="text-white mt-0 mb-5">
                Đây là trang hồ sơ cá nhân của bạn. Bạn có thể xem thông tin và chỉnh sửa! Nhưng thông tin về tài khoản của bạn như Email và Password không thể thay đổi được!
              </p>
              <p className="text-white mt-0 mb-5">
                Chúc bạn một ngày làm việc vui vẻ.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
