const express = require('express');
const jobseekerController = require('../controllers/jobseekerController.js');
const homepageController = require('../controllers/homepageController.js');
const CVController = require("../controllers/CVController.js");


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
router.get("/trang-chu/lich-su", homepageController.historyApply);
router.put("/CV-infor/:id", CVController.upload, CVController.updateInfor);
router.put("/CV-edu/:id", CVController.updateEdu);
router.put("/CV-obj/:id", CVController.updateObj);
router.put("/CV-cer/:id", CVController.updateCer);
router.put("/CV-award/:id", CVController.updateArward);
router.put("/CV-interest/:id", CVController.updateInterest);
router.put("/CV-skill/:id", CVController.updateSkill);
router.put("/CV-exp/:id", CVController.updateEpx);
router.put("/CV-activity/:id", CVController.updateActivity);

router.post("/CV-edu/", CVController.createEdu);
router.post("/CV-cer/", CVController.createCer);
router.post("/CV-award/", CVController.createArward);
router.post("/CV-skill/", CVController.createSkill);
router.post("/CV-exp/", CVController.createEpx);
router.post("/CV-activity/", CVController.createActivity);

router.get("/fetch/CV-infor", CVController.fetchInfo);
router.get("/fetch/CV-obj", CVController.fetchObj);
router.get("/fetch/CV-edu", CVController.fetchEdu);
router.get("/fetch/CV-skill", CVController.fetchSkill);
router.get("/fetch/CV-exp", CVController.fetchExp);


router.delete("/deleteCVEdu/:id", CVController.destroyEdu);
router.delete("/deleteCVSkill/:id", CVController.destroySkill);
router.delete("/deleteCVExp/:id", CVController.destroyExp);


router.get("/home/session", (req, res) => {
    if (req.session.jobseeker) {
        res.json({
            loggedIn: true,
            jobseeker: req.session.jobseeker
        });
    }
    else {
        res.json({ loggedIn: false });
    }
});


router.get("/fetch/viewFullCV", CVController.viewFullCV);


module.exports = router;