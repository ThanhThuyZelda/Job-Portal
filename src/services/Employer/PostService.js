import { head } from 'lodash';
import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


// service Post
const fetchAllPost = (page) => {
    return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/show/hienthi?page=${page}`);
    // return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/show/hienthi`);

}

// search Post
// service Post
const searchPost = (text, skillID, workform) => {
    return axios.get(`/nha-tuyen-dung/trang-chu/tim-kiem-post?text=${text}&skillID=${skillID}&workform=${workform}`);
}

// display list city
const fetchAllCity = (page) => {
    return axios.get(`/quan-tri-vien/thanh-pho/`);
}


const postCreate = (headline, salary, gender, require, des, benefit, quantity, address, workform, skillID, empID, compID, status, DeadlineSubmission) => {
    return axios.post('/nha-tuyen-dung/bai-tuyen-dung/them', {
        headline, salary, gender, require, des, benefit, quantity, address, workform, skillID, empID, compID, status, DeadlineSubmission
    })
}
const fetchEmployerFromSession = () => {
    return axios.get(`/nha-tuyen-dung/home/NTD`);
}

const fetchDetailPosts = (id) => {
    return axios.get(`/nha-tuyen-dung/bai-tuyen-dung/${id}`);
}

const putUpdatePost = (id, headline, salary, gender, require, des, benefit, quantity, address, workform, skillID, empID, compID, status, DeadlineSubmission) => {
    return axios.put(`/nha-tuyen-dung/bai-tuyen-dung/${id}`, {
        headline, salary, gender, require, des, benefit, quantity, address, workform, skillID, empID, compID, status, DeadlineSubmission
    });
}

const deletePost = (id) => {
    return axios.delete(`/nha-tuyen-dung/bai-tuyen-dung/${id}`)
}
const listCVOfPost = (postID) => {
    return axios.get(`/nha-tuyen-dung/ds-CV/${postID}`);
}





export {
    fetchAllPost, postCreate, fetchEmployerFromSession, listCVOfPost,
    fetchDetailPosts, deletePost, putUpdatePost, fetchAllCity, searchPost
};