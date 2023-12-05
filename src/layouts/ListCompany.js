import Header from "components/Headers/JobSeeker.js";
import Footer from "components/Footers/JobSeeker.js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllCompany } from "../services/Homepage/PostService.js";

const ListCompany = () => {
    const [listCompany, setListCompany] = useState([]);

    useEffect(() => {
        //call api
        getCompany();
    }, []);

    const getCompany = async () => {
        let res = await fetchAllCompany();
        // console.log(res);
        if (res) {
            setListCompany(res);
        }
    }
    //CHi tiet cong cty
    const navigate = useNavigate();

    const handleDetailCompany = (company) => {
        navigate('/ds-cong-ty/chi-tiet-cong-ty/',
            { replace: true, state: company });

    }



    return (
        <>

            <Header />
            <main>

                <div className="our-services section-pad-t30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle text-center">
                                    <h2>Danh sách công ty tiềm năng</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-contnet-center">
                            {listCompany && listCompany.length > 0
                                && listCompany.map((item, index) => (
                                    <>
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={index}>
                                            <div className="single-services text-center mb-30">
                                                <div className="services-ion">
                                                    {/* <span className="flaticon-tour"></span> */}
                                                    <img
                                                        src={item.logo !== "user.png" && item.logo !== null
                                                            ? `http://localhost:8080/uploads/${item.logo}`
                                                            : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                        }
                                                        width="150px"
                                                        height="150px"
                                                        alt="" />
                                                </div>
                                                <div className="services-cap">
                                                    <h5><a onClick={() => handleDetailCompany(item)}>{item.name}</a></h5>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                ))
                            }
                        </div>

                    </div>
                </div>




            </main>
            <Footer />
        </>

    )
}


export default ListCompany;