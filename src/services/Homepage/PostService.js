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
const applyCV = (img, desc, jobseekerID, postID) => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("desc", desc);
    formData.append("jobseekerID", jobseekerID);
    formData.append("postID", postID);
    return axios.post(`/nguoi-tim-viec/nop-cv`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}
//history apply
const history = () => {
    return axios.get('/nguoi-tim-viec/trang-chu/lich-su');
}
//Create CV
const fetchCVInfor = () => {
    return axios.get('/nguoi-tim-viec/fetch/CV-infor');
}
const updateCVInfor = (id, img, fullname, email, position, gender, phone, link, address, birthday) => {
    const formData = new FormData();

    formData.append("img", img);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("link", link);
    formData.append("address", address);
    formData.append("birthday", birthday);
    return axios.put(`/nguoi-tim-viec/CV-infor/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

//Create CV
const fetchCVObj = () => {
    return axios.get('/nguoi-tim-viec/fetch/CV-obj');
}
const updateCVObj = (id, obj) => {
    return axios.put(`/nguoi-tim-viec/CV-obj/${id}`, { obj });
}
//hoc van
const fetchCVEdu = () => {
    return axios.get('/nguoi-tim-viec/fetch/CV-edu');
}
const createCVEdu = (school, major, start, end, present, more) => {
    return axios.post('/nguoi-tim-viec/CV-edu/', { school, major, start, end, present, more });
}
const deleteCVEdu = (id) => {
    return axios.delete(`/nguoi-tim-viec/deleteCVEdu/${id}`);
}
const updateCVEdu = (id, school, major, start, end, present, more) => {
    return axios.put(`/nguoi-tim-viec/CV-edu/${id}`, { school, major, start, end, present, more });
}
//skill
const fetchCVSkill = () => {
    return axios.get('/nguoi-tim-viec/fetch/CV-skill');
}
const createCVSkill = (name, des) => {
    return axios.post('/nguoi-tim-viec/CV-skill/', { name, des });
}
const deleteCVSkill = (id) => {
    return axios.delete(`/nguoi-tim-viec//deleteCVSkill/${id}`);
}
const updateCVSkill = (id, name, des) => {
    return axios.put(`/nguoi-tim-viec/CV-skill/${id}`, { name, des });
}

//work experience
const fetchCVExp = () => {
    return axios.get('/nguoi-tim-viec/fetch/CV-exp');
}
const createCVExp = (position, company, start, end, present, des) => {
    return axios.post('/nguoi-tim-viec/CV-exp/', { position, company, start, end, present, des });
}
const deleteCVExp = (id) => {
    return axios.delete(`/nguoi-tim-viec//deleteCVExp/${id}`);
}
const updateCVExp = (id, position, company, start, end, present, des) => {
    return axios.put(`/nguoi-tim-viec/CV-exp/${id}`, { position, company, start, end, present, des });
}



export {
    fetchAllPost, fetchOtherPostCompany, RegisterJS, LoginJS,
    fetchAllCompany, fetchPostHomepage, fetchPostOfCompany,
    applyCV, history,
    fetchCVInfor, updateCVInfor, fetchCVObj, updateCVObj,
    fetchCVEdu, createCVEdu, deleteCVEdu, updateCVEdu,
    fetchCVSkill, createCVSkill, deleteCVSkill, updateCVSkill,
    fetchCVExp, createCVExp, deleteCVExp, updateCVExp
};