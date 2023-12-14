import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Button, Container,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Row,
    Col
} from "reactstrap";
import Header from "components/Headers/EmployerHeader";
import { btd, totalCV, totalCVOfPost } from "services/Employer/ChartService.js";
const BarChart = () => {
    const [data1, setData1] = useState({});
    const [totalPost, setTotalPost] = useState([]);
    const [CV, setCV] = useState();
    const [CVPost, setCVPost] = useState([]);
    useEffect(() => {
        CountPost();
        CountCV();
        CVOfPost();
    }, []);

    const CountPost = async () => {
        let res = await btd();
        //console.log(res);
        if (res) {
            setTotalPost(res);
        }
    }

    const CountCV = async () => {
        let res = await totalCV();
        if (res) {
            setCV(res.total);
        }
    }
    const CVOfPost = async () => {
        let res = await totalCVOfPost();
        if (res) {
            setCVPost(res);
        }
    }


    useEffect(() => {
        CVOfPost();
        const chartData1 = {
            labels: CVPost.map(item => item.headline),
            datasets: [
                {
                    label: 'Số CV',
                    data: CVPost.map(item => item.cvCount),
                    backgroundColor: [
                        'red',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                    ],
                },
            ],
        };

        setData1(chartData1);
    }, []);

    return (
        <> <Header />
            <Container className="mt--6" >

                <Row className="justify-content-left text-center">
                    {totalPost && totalPost.length > 0
                        && totalPost.map((item, index) => (
                            <>
                                <Col xs="3" key={index}>
                                    <div style={{ width: "18rem" }}>
                                        <Card className="card-stats mb-4 mb-lg-0">
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase text-muted mb-0">
                                                            TỔNG SỐ BÀI TUYỂN DỤNG
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold mb-0">{item.btd}</span>
                                                    </div>
                                                    <Col className="col-auto">
                                                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                            <i className="fas fa-chart-bar" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                {/* sd */}
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                                <Col xs="3">
                                    <div style={{ width: "18rem" }}>
                                        <Card className="card-stats mb-4 mb-lg-0">
                                            <CardBody>
                                                <Row>
                                                    <div className="col">
                                                        <CardTitle className="text-uppercase text-muted mb-0">
                                                            TỔNG SỐ BÀI ĐANG TUYỂN DỤNG
                                                        </CardTitle>
                                                        <span className="h2 font-weight-bold mb-0">{item.status1}</span>
                                                    </div>
                                                    <Col className="col-auto">
                                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                            <i className="fas fa-percent" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                            </>
                        ))
                    }

                    <Col xs="3">
                        <div style={{ width: "18rem" }}>
                            <Card className="card-stats mb-4 mb-lg-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle className="text-uppercase text-muted mb-0">
                                                TỔNG SỐ CV ĐÃ NỘP
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">{CV}</span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                <i className="fas fa-chart-pie" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ width: "700px", height: "300px" }}>
                    <div>
                        <h2>Số CV của mỗi bài tuyển dụng</h2>
                        <Bar data={data1} />
                    </div>
                </div>
            </Container >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>

    );
};

export default BarChart;
