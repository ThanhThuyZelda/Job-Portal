import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
// service Position
const fetchAllJobSeeker = (page) => {
    return axios.get(`/quan-tri-vien/nguoi-tim-viec/?page=${page}`);
}

const deleteJobSeeker = (id) => {
    return axios.delete(`/quan-tri-vien/nguoi-tim-viec/${id}`);
}

// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { fetchAllJobSeeker, deleteJobSeeker };