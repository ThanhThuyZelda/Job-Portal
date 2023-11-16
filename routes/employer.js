const express = require('express');
const employerController = require('../controllers/employerController.js');
const postsController = require('../controllers/postsController.js');
const checkAuthMiddleware = require('../middleware/check-auth.js');
const companyController = require("../controllers/companyController");
const models = require('../models');
const router = express.Router();

//Employer Company
router.post("/cong-ty/them", companyController.upload, companyController.save);
router.put("/cong-ty/:id", companyController.upload, companyController.update);
router.delete("/cong-ty/:id", companyController.destroy);
router.get("/cong-ty/", companyController.show);
router.get("/cong-ty/:id", companyController.index);


// CRUD EMPLOYER
// router.post('/dang-ky', checkAuthMiddleware.checkAuth ,employerController.signUp);
router.post('/dang-ky', employerController.upload, employerController.signUp);
router.post('/dang-nhap', employerController.login);
router.get("/:id", employerController.show);
router.get("/", employerController.index);
router.delete("/:id", employerController.destroy);
router.put("/:id", employerController.upload, employerController.update);

//CRUD post
router.post("/bai-tuyen-dung/them", postsController.save);
router.put("/bai-tuyen-dung/:id", postsController.update);
router.delete("/bai-tuyen-dung/:id", postsController.destroy);
router.get("/bai-tuyen-dung/show/hienthi", postsController.show);
router.get("/bai-tuyen-dung/:id", postsController.index);

router.get("/home/session", (req, res) => {
    if (req.session.employer) {
        res.json({
            loggedIn: true,
            employer: req.session.employer
        });
    }
    else {
        res.json({ loggedIn: false });
    }
});

router.get("/home/companyOfEmployer", async (req, res) => {
    const ntd = req.session.companyID;

    await models.Company.findOne({
        where: { id: ntd }
    }).then(result => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({
                message: "Not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi!"
        })
    })
});
router.get("/home/NTD", async (req, res) => {
    const ntd = req.session.employer.id;

    await models.Employer.findByPk(ntd)
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "Not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi!"
            })
        })
});
//8. Get company
router.get("/home/companyID", async (req, res) => {
    const cmpID = req.session.employer.companyID;

    await models.Company.findOne({
        attributes: ['name'],
        where: {
            id: cmpID
        }
    }).then(result => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({
                message: "Not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi!"
        })
    })

})

module.exports = router;