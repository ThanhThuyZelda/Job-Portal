
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchOtherPostCompany } from "services/Homepage/PostService.js"
const Company = () => {
    const location = useLocation();
    // console.log('Location:', location);

    return (
        <>
            <div className="container">
                <div className="row justify-content-between">
                    {/* <!-- Left Content --> */}
                    <div className="col-xl-7 col-lg-7">
                        <div className="job-post-details">
                            <div className="post-details1 mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h2>Thông tin về công ty</h2>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: location.state.Company.description }}>

                                </p>
                            </div>
                            <div className="post-details1 mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h2> <i class="fa-solid fa-location-dot"></i> Địa chỉ công ty</h2>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: location.state.Company.address }}>

                                </p>
                            </div>

                        </div>

                    </div>
                    {/* <!-- Right Content --> */}
                    <div className="col-xl-5 col-lg-5" >
                        <div className="post-details3  mb-50">
                            {/* <!-- Small Section Tittle --> */}
                            <div className="small-section-tittle">
                                <h3>Thông tin liên hệ</h3>
                            </div>
                            <ul>
                                <li>Website: <a href={location.state.Company.website} target="_blank">{location.state.Company.website}</a></li>
                                <li>Quốc gia : <span>{location.state.Company.country}</span></li>
                                <li>Hình thức làm việc : <span>{location.state.Company.worktime}</span></li>
                                <li>Ngôn ngữ:  <span>{location.state.Company.skill}</span></li>
                                <li>Quy mô:  <span>{location.state.Company.scale}</span></li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default Company;



