import React from 'react';

const Footer = () => {
    return (
        <footer>
            {/* Footer Start*/}
            <div className="footer-area footer-bg footer-padding">
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="single-footer-caption mb-50">
                                <div className="single-footer-caption mb-30">
                                    <div className="footer-tittle">
                                        <h4>About Us</h4>
                                        <div className="footer-pera">
                                            <p>Công cụ tốt nhất cho hành trang ứng tuyển của bạn
                                                Khẳng định bản thân qua hồ sơ "chất" với công cụ và kiến thức bổ ích từ Argon.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Contact Info</h4>
                                    <ul>
                                        <li>
                                            <p>Địa chỉ :Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                                        </li>
                                        <li><a href="#">0292 3832 555</a></li>
                                        <li><a href="#">Email : betiti2709@gmail.com</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Important Link</h4>
                                    <ul>
                                        <li><a href="/trang-chu">Trang chủ</a></li>
                                        <li><a href="/tim-viec-lam">Tìm việc làm</a></li>
                                        <li><a href="/ds-cong-ty">Danh sách công ty</a></li>
                                        <li><a href="/employer/dang-nhap">Dành cho nhà tuyển dụng</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Additional rows and content */}
                    <div className="row footer-wejed justify-content-between">
                        {/* Footer Bottom Section */}
                    </div>
                </div>
            </div>
            {/* Footer Bottom Section */}
            <div className="footer-bottom-area footer-bg">
                <div className="container">
                    <div className="footer-border">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-xl-10 col-lg-10 ">
                                <div className="footer-copy-right">
                                    <p>
                                        Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved |
                                        This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a
                                            href="https://colorlib.com" target="_blank">Colorlib</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2">
                                <div className="footer-social f-right">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fas fa-globe"></i></a>
                                    <a href="#"><i className="fab fa-behance"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End*/}
        </footer>
    );
}

export default Footer;
