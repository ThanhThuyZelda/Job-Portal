
import { useState, useEffect } from "react";
const Post = () => {


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
                                <p>It is a long established fact that a reader will beff distracted by vbthe creadable content of a page when looking at its layout. The pointf of using Lorem Ipsum is that it has ahf mcore or-lgess normal distribution of letters, as opposed to using, Content here content here making it look like readable.</p>
                            </div>
                            <div className="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h4>Yêu cầu công việc</h4>
                                </div>
                                <ul>
                                    <li>System Software Development</li>
                                    <li>Mobile Applicationin iOS/Android/Tizen or other platform</li>
                                    <li>Research and code , libraries, APIs and frameworks</li>
                                    <li>Strong knowledge on software development life cycle</li>
                                    <li>Strong problem solving and debugging skills</li>
                                </ul>
                            </div>
                            <div className="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h4>Quyền lợi</h4>
                                </div>
                                <ul>
                                    <li>3 or more years of professional design experience</li>
                                    <li>Direct response email experience</li>
                                    <li>Ecommerce website design experience</li>
                                    <li>Familiarity with mobile and web apps preferred</li>
                                    <li>Experience using Invision a plus</li>
                                </ul>
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
                                <li>Posted date : <span>12 Aug 2019</span></li>
                                <li>Location : <span>New York</span></li>
                                <li>Vacancy : <span>02</span></li>
                                <li>Job nature : <span>Full time</span></li>
                                <li>Salary :  <span>$7,800 yearly</span></li>
                                <li>Application date : <span>12 Sep 2020</span></li>
                            </ul>
                            <div className="apply-btn2">
                                <a href="#" className="btn">Apply Now</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default Post;



