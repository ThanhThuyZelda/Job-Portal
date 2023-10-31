import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
// service Position
const fetchAllPosition = (page) => {
    return axios.get(`/quan-tri-vien/vi-tri/?page=${page}`);
}
//add new
const postCreatePosition = (name) => {
    return axios.post('/quan-tri-vien/vi-tri/them', {
        name: name
    })
}
const putUpdatePosition = (id, name) => {
    return axios.put(`/quan-tri-vien/vi-tri/${id}`, { name });
}

const deletePosition = (id) => {
    return axios.delete(`/quan-tri-vien/vi-tri/${id}`);
}

// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { fetchAllPosition, postCreatePosition, putUpdatePosition, deletePosition };