import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

//find company
const fetchCompanyFromSession = () => {
    return axios.get(`/nha-tuyen-dung/home/companyOfEmployer`);
}


const putUpdateCompany = (id, name, logo, address, worktime, country, description, website, scale, skill) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("logo", logo);
    formData.append("address", address);
    formData.append("worktime", worktime);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("scale", scale);
    formData.append("skill", skill);
    return axios.put(`/nha-tuyen-dung/cong-ty/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}




// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { putUpdateCompany, fetchCompanyFromSession };