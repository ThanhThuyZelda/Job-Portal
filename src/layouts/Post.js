
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Post = () => {
    const location = useLocation();

    return (
        <>
            <div className="container">
                <div className="row justify-content-between">
                    {/* <!-- Left Content --> */}
                    <div className="col-xl-7 col-lg-8">
                        <div className="job-post-details">
                            <div className="post-details1 mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h4>Mô tả chi tiết công việc</h4>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: location.state.des }}></p>
                            </div>
                            <div className="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h4>Yêu cầu công việc</h4>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: location.state.require }}></p>
                            </div>
                            <div className="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h4>Quyền lợi</h4>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: location.state.benefit }}></p>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Right Content --> */}
                    <div className="col-xl-4 col-lg-4">
                        <div className="post-details3  mb-50">
                            {/* <!-- Small Section Tittle --> */}
                            <div className="small-section-tittle">
                                <h4>Job Overview</h4>
                            </div>
                            <ul>
                                <li>Ngày đăng : <span>
                                    {location.state.createdAt && (
                                        <>
                                            {new Date(location.state.createdAt).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric",
                                            })}
                                        </>
                                    )}
                                </span></li>
                                <li>Địa chỉ làm việc : <span>{location.state.address}</span></li>
                                <li>Số lượng : <span>{location.state.quantity}</span></li>
                                <li>Hình thức làm việc : <span>{location.state.workform}</span></li>
                                <li>Mức lương :  <span>{location.state.salary}</span></li>
                                <li>Thời gian làm việc : <span>{location.state.Company.worktime}</span></li>
                                <li>Hạn nộp hồ sơ : <span>
                                    {location.state.DeadlineSubmission && (
                                        <>
                                            {new Date(location.state.DeadlineSubmission).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric",
                                            })}
                                        </>
                                    )}
                                </span></li>
                            </ul>
                            {/* <div className="apply-btn2">
                                <button href="#" className="btn">Apply Now</button>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default Post;



