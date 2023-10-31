import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
// service Position
const fetchAllSkill = (page) => {
    return axios.get(`/quan-tri-vien/ky-nang/?page=${page}`);
}
//add new
const postCreateSkill = (name) => {
    return axios.post('/quan-tri-vien/ky-nang/them', {
        name: name
    })
}
const putUpdateSkill = (id, name) => {
    return axios.put(`/quan-tri-vien/ky-nang/${id}`, { name });
}

const deleteSkill = (id) => {
    return axios.delete(`/quan-tri-vien/ky-nang/${id}`);
}

// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }

export { fetchAllSkill, postCreateSkill, putUpdateSkill, deleteSkill };