const express = require('express');
const jobseekerController = require('../controllers/jobseekerController.js');
const homepageController = require('../controllers/homepageController.js');


const router = express.Router();


// CRUD JOBSEEKER
router.post("/dang-ky", jobseekerController.upload, jobseekerController.signUp);
router.post("/dang-nhap", jobseekerController.login);
router.get("/", jobseekerController.index);
router.get("/:id", jobseekerController.show);
router.put("/:id", jobseekerController.upload, jobseekerController.update);
router.delete("/:id", jobseekerController.destroy);


//apply CV
router.post("/nop-cv", homepageController.upload, homepageController.Apply);
//get post
router.get("/trang-chu/bai-viet", homepageController.HomeFetchPost);

router.get("/trang-chu/post-cong-ty/:id", homepageController.fetchPostOfCompany);

module.exports = router;