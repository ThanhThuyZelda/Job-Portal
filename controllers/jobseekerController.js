const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');


//1. Sign Up
const signUp = async (req, res) => {

    await models.JobSeeker.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email already exists!"
                });
            } else {
                // Password
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, async (err, hash) => {


                        if (typeof req.file === "undefined") {
                            image = "user.png";

                        } else {
                            image = req.file.filename
                        }
                        const jobseeker = {
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: hash,
                            img: image
                        };


                        const schema = {
                            fullname: { type: "string", optional: false, max: "100" },
                            email: { type: "email" },
                            password: { type: "string", min: "6" },
                            // img: { type: "string" }
                        }
                        const v = new Validator();
                        const validationResponse = v.validate(jobseeker, schema);

                        if (validationResponse !== true) {
                            return res.status(400).json({
                                message: "Validation failed",
                                errors: validationResponse
                            });
                        }
                        const createdJobSeeker = await models.JobSeeker.create(jobseeker)
                        // .then(result => {
                        //     res.status(201).json({
                        //         message: "Jobseekers created successfully!"
                        //     });
                        // }).catch(error => {
                        //     res.status(500).json({
                        //         message: "Somethong went wrong!"
                        //     });
                        // });

                        const infor = await models.CVInfor.create({ JobSeekerID: createdJobSeeker.id });
                        const edu = await models.CVEducation.create({ JobSeekerID: createdJobSeeker.id });
                        const obj = await models.CVCareerObj.create({ JobSeekerID: createdJobSeeker.id });
                        const cer = await models.CVCertification.create({ JobSeekerID: createdJobSeeker.id });
                        const award = await models.CVAward.create({ JobSeekerID: createdJobSeeker.id });
                        const interest = await models.CVInterest.create({ JobSeekerID: createdJobSeeker.id });
                        const skill = await models.CVSkill.create({ JobSeekerID: createdJobSeeker.id });
                        const exp = await models.CVWorkExp.create({ JobSeekerID: createdJobSeeker.id });
                        const activity = await models.CVActivity.create({ JobSeekerID: createdJobSeeker.id });

                        return res.status(201).json({
                            message: "Jobseekers created successfully!"
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
    await models.JobSeeker.findOne({ where: { email: req.body.email } })
        .then(jobseeker => {
            if (jobseeker == null) {
                res.status(401).json({
                    message: "Invalid email!",
                });
            } else {
                bcryptjs.compare(req.body.password, jobseeker.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: jobseeker.email
                        }, process.env.JWT_KEY, (err, token) => {
                            req.session.jobseeker = {
                                id: jobseeker.id,
                                email: jobseeker.email,
                                fullname: jobseeker.fullname,
                                img: jobseeker.img
                            };
                            // req.session.id = jobseeker.id;
                            console.log(req.session.jobseeker.id);


                            res.status(200).json({
                                message: "Authentication successfully!",
                                token: token
                            })
                        })
                    } else {
                        res.status(401).json({
                            message: "Invalid password!",
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

//get single jobseeker

const show = async (req, res) => {
    const id = req.params.id;

    models.JobSeeker.findByPk(id).then(result => {
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
    });
}
//get all jobseeker
function index(req, res) {
    models.JobSeeker.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi"
        });
    });
}
//update
function update(req, res) {
    const id = req.params.id;

    const updateJobSeeker = {
        fullname: req.body.fullname,
        email: req.body.email,
        // password: req.body.password,
        img: req.file.filename
    }


    models.JobSeeker.update(updateJobSeeker, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            jobseeker: updateJobSeeker
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong!",
            error: error
        });
    })
}

function destroy(req, res) {
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



// Uploaf Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, Date.now() +  path.extname(file.originalname));
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));

    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('img')


module.exports = {
    signUp: signUp,
    login: login,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    upload: upload
}