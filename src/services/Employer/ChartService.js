import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const btd = () => {
    return axios.get(`/nha-tuyen-dung/total/post`);
}

const totalCV = () => {
    return axios.get(`/nha-tuyen-dung/total/CV`);
}
const totalCVOfPost = () => {
    return axios.get(`/nha-tuyen-dung/total/CVEachPost`);
}


export { btd, totalCV, totalCVOfPost };