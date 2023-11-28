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
    return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/show/hienthi?page=${page}`);
    // return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/show/hienthi`);
}


const postCreate = (headline, salary, gender, require, des, benefit, quantity, address, workform, positionID, empID, status, DeadlineSubmission) => {
    return axios.post('/nha-tuyen-dung/bai-tuyen-dung/them', {
        headline, salary, gender, require, des, benefit, quantity, address, workform, positionID, empID, status, DeadlineSubmission
    })
}
const fetchEmployerFromSession = () => {
    return axios.get(`/nha-tuyen-dung/home/NTD`);
}

const fetchDetailPosts = (id) => {
    return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/${id}`);
}

const putUpdatePost = (id, headline, salary, gender, require, des, benefit, quantity, address, workform, positionID, empID, status, DeadlineSubmission) => {
    return axios.put(`/nha-tuyen-dung/bai-tuyen-dung/${id}`, {
        headline, salary, gender, require, des, benefit, quantity, address, workform, positionID, empID, status, DeadlineSubmission
    });
}

const deletePost = (id) => {
    return axios.delete(`/nha-tuyen-dung/bai-tuyen-dung/${id}`)
}


export { fetchAllPost, postCreate, fetchEmployerFromSession, fetchDetailPosts, deletePost, putUpdatePost };