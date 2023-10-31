const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const session = require('express-session');


//1. Sign Up
const signUp = async (req, res) => {

    await models.Admin.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email already exists!"
                });
            } else {
                // Password
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, async (err, hash) => {

                        const admin = {
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: hash
                        };


                        const schema = {
                            fullname: { type: "string", optional: false, max: "100" },
                            email: { type: "email" },
                            password: { type: "string", min: "6" },
                        }
                        const v = new Validator();
                        const validationResponse = v.validate(admin, schema);

                        if (validationResponse !== true) {
                            return res.status(400).json({
                                message: "Validation failed",
                                errors: validationResponse
                            });
                        }
                        await models.Admin.create(admin)
                            .then(result => {
                                res.status(201).json({
                                    message: "Jobseekers created successfully!"
                                });
                            }).catch(error => {
                                res.status(500).json({
                                    message: "Somethong went wrong!"
                                });
                            });
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
}
//2. Login
const login = async (req, res) => {
    await models.Admin.findOne({ where: { email: req.body.email } })
        .then(admin => {
            if (admin == null) {
                res.status(401).json({
                    message: "Email không tồn tại!",
                });
            } else {
                bcryptjs.compare(req.body.password, admin.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: admin.email
                        }, process.env.JWT_KEY, (err, token) => {
                            req.session.fullname = admin.fullname;
                            console.log(req.session.fullname);
                            res.status(200).json({
                                message: "Bạn đã đăng nhập thành công!",
                                token: token

                            })
                        })
                    } else {
                        res.status(401).json({
                            message: "Password không đúng!!!",
                        })
                    }
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: "Sonething went wrong!",
            })
        });

}
//session


///=============Employer===============
//4. Show
const showAllEmployer = async (req, res) => {
    let page = req.query.page;
    const limit = 10;

    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;

        models.Employer.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(result => {
                const pageCount = Math.ceil(result.count / limit);
                res.status(200).json({
                    data: result,
                    totalPage: pageCount
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Đã xảy ra lỗi"
                });
            });
    }
    else {
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;
        models.Employer.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(result => {
                const pageCount = Math.ceil(result.count / limit);
                res.status(200).json({
                    data: result,
                    totalPage: pageCount
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Đã xảy ra lỗi"
                });
            });
    }
}

// 6. Destroy
function destroyEmployer(req, res) {
    const id = req.params.id;

    models.Employer.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Xóa nhà tuyển dụng thành công",
            // jobseeker: result
        });
    }).catch(error => {
        res.status(200).json({
            message: "Đã xảy ra lỗi",
            error: error
        });
    });
}

//========================JOB SEEKER================
//display
const showAllJobSeeker = async (req, res) => {
    let page = req.query.page;
    const limit = 10;

    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;

        models.JobSeeker.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(result => {
                const pageCount = Math.ceil(result.count / limit);
                res.status(200).json({
                    data: result,
                    totalPage: pageCount
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Đã xảy ra lỗi"
                });
            });
    }
    else {
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;
        models.JobSeeker.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(result => {
                const pageCount = Math.ceil(result.count / limit);
                res.status(200).json({
                    data: result,
                    totalPage: pageCount
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Đã xảy ra lỗi"
                });
            });
    }
}

//delete
function destroyJobSeeker(req, res) {
    const id = req.params.id;

    models.JobSeeker.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Xóa người tìm việc thành công",
            // jobseeker: result
        });
    }).catch(error => {
        res.status(200).json({
            message: "Đã xảy ra lỗi",
            error: error
        });
    });
}


module.exports = {
    signUp: signUp,
    login: login,
    showAllEmployer: showAllEmployer,
    destroyEmployer: destroyEmployer,
    showAllJobSeeker: showAllJobSeeker,
    destroyJobSeeker: destroyJobSeeker

}