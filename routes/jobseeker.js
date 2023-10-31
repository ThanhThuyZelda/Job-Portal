const express = require('express');
const jobseekerController = require('../controllers/jobseekerController.js');


const router = express.Router();


// CRUD JOBSEEKER
router.post("/dang-ky", jobseekerController.upload, jobseekerController.signUp);
router.post("/dang-nhap", jobseekerController.login);
router.get("/", jobseekerController.index);
router.get("/:id", jobseekerController.show);
router.put("/:id", jobseekerController.upload, jobseekerController.update);
router.delete("/:id", jobseekerController.destroy);





module.exports = router;