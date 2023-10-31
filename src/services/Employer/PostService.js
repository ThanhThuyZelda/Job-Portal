import { head } from 'lodash';
import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


// service City
const fetchAllPost = (page) => {
    return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/show/hienthi/?page=${page}`);
}


const postCreate = (headline, salary, gender, require, des, address, empID) => {
    return axios.post('/nha-tuyen-dung/bai-tuyen-dung/them', {
        headline, salary, gender, require, des, address, empID
    })
}
// const putUpdateCity = (id, name) => {
//     return axios.put(`/quan-tri-vien/thanh-pho/${id}`, { name });
// }

// const deleteCity = (id) => {
//     return axios.delete(`/quan-tri-vien/thanh-pho/${id}`);
// }

// const searchCity = (key) => {
//     return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

// }
// const allCity = () => {
//     return axios.get('/quan-tri-vien/thanh-pho-all/');
// }


export { fetchAllPost, postCreate };