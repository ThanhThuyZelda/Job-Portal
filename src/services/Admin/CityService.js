import axios from '../customize-axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


// service City
const fetchAllCity = (page) => {
    return axios.get(`/quan-tri-vien/thanh-pho/?page=${page}`);
}


const postCreateCity = (name) => {
    return axios.post('/quan-tri-vien/thanh-pho/them', {
        name: name
    })
}
const putUpdateCity = (id, name) => {
    return axios.put(`/quan-tri-vien/thanh-pho/${id}`, { name });
}

const deleteCity = (id) => {
    return axios.delete(`/quan-tri-vien/thanh-pho/${id}`);
}

const searchCity = (key) => {
    return axios.get(`/quan-tri-vien/thanh-pho/tim-kiem/${key}`);

}
const allCity = () => {
    return axios.get('/quan-tri-vien/thanh-pho-all/');
}


export { fetchAllCity, postCreateCity, putUpdateCity, deleteCity, searchCity, allCity };