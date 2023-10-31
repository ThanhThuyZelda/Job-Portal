import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
// service Position
const fetchAllEmployer = (page) => {
    return axios.get(`/quan-tri-vien/nha-tuyen-dung/?page=${page}`);
}

const deleteEmployer = (id) => {
    return axios.delete(`/quan-tri-vien/nha-tuyen-dung/${id}`);
}

// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { fetchAllEmployer, deleteEmployer };