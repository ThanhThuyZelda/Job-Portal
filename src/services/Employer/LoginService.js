import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;

    } else if (error.request) {

        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }

    return res;

});
// service Position
axios.defaults.withCredentials = true;
const EmployerLogin = (email, password) => {
    return axios.post(`/nha-tuyen-dung/dang-nhap`, { email, password });
}

const postCreateEmployer = (fullname, phone, email, password, position, company, address, website) => {
    return axios.post('/nha-tuyen-dung/dang-ky',
        {
            fullname, phone, email, password, position, company, address, website
        })
}

export { EmployerLogin, postCreateEmployer };