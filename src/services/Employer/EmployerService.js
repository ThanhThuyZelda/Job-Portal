import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

//find company
const fetchEmployerFromSession = () => {
    return axios.get(`/nha-tuyen-dung/home/NTD`);
}


const putUpdateNTD = (id, fullname, phone, position, img) => {
    const formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("img", img);
    return axios.put(`/nha-tuyen-dung/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}




// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { fetchEmployerFromSession, putUpdateNTD };