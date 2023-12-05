import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const fetchAllPost = (page) => {
    return axios.get(`/nha-tuyen-dung/trang-chu/bai-tuyen-dung/?page=${page}`);
}

const fetchOtherPostCompany = (id) => {
    return axios.get(`/nha-tuyen-dung/trang-chu/cong-ty-post/${id}`);
}

const RegisterJS = (fullname, email, password) => {
    return axios.post(`/nguoi-tim-viec/dang-ky`, { fullname, email, password })
}
const LoginJS = (email, password) => {
    return axios.post(`/nguoi-tim-viec/dang-nhap`, { email, password })
}
// homepage cong ty
const fetchAllCompany = () => {
    return axios.get('/nha-tuyen-dung/cong-ty/');
}
//homepage post
const fetchPostHomepage = () => {
    return axios.get('/nguoi-tim-viec/trang-chu/bai-viet');
}
const fetchPostOfCompany = (id) => {
    return axios.get(`/nguoi-tim-viec/trang-chu/post-cong-ty/${id}`);
}

export { fetchAllPost, fetchOtherPostCompany, RegisterJS, LoginJS, fetchAllCompany, fetchPostHomepage, fetchPostOfCompany };