const express = require('express');
const adminController = require("../controllers/adminController");

const cityController = require("../controllers/cityController");
const skillController = require("../controllers/skillController");
const positionController = require("../controllers/positionController");
const checkAuthMiddleware = require('../middleware/check-auth.js');


const router = express.Router();

//Admin
router.post("/dang-ky", adminController.signUp);
router.post("/dang-nhap", adminController.login);


//Admin CRUD city
router.post("/thanh-pho/them", cityController.save);
router.put("/thanh-pho/:id", cityController.update);
router.delete("/thanh-pho/:id", cityController.destroy);
router.get("/thanh-pho/", cityController.show);
router.get("/thanh-pho/:id", cityController.index);
router.get("/thanh-pho/tim-kiem/:key", cityController.search);
router.get("/thanh-pho-all/", cityController.showall);

//Admin CRUD Skill
router.post("/ky-nang/them", skillController.save);
router.put("/ky-nang/:id", skillController.update);
router.delete("/ky-nang/:id", skillController.destroy);
router.get("/ky-nang/", skillController.show);
router.get("/ky-nang/:id", skillController.index);

//Admin CRUD Position
router.post("/vi-tri/them", positionController.save);
router.put("/vi-tri/:id", positionController.update);
router.delete("/vi-tri/:id", positionController.destroy);
router.get("/vi-tri/", positionController.show);
router.get("/vi-tri/:id", positionController.index);

//Dashboard Admin
router.get('/nha-tuyen-dung/', adminController.showAllEmployer);
router.delete("/nha-tuyen-dung/:id", adminController.destroyEmployer);

router.get('/nguoi-tim-viec/', adminController.showAllJobSeeker);
router.delete("/nguoi-tim-viec/:id", adminController.destroyJobSeeker);



router.get("/home", (req, res) => {
    if (req.session.fullname) {
        res.json({
            loggedIn: true,
            fullname: req.session.fullname
        });
    }
    else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;