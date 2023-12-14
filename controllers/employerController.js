const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const Sequelize = require('sequelize');
//1. Sign Ups
const signUp = async (req, res) => {
    const company = await models.Company.create({ name: req.body.company, address: req.body.address, website: req.body.website })
    await models.Employer.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already exists!",

            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, async (err, hash) => {

                    if (typeof req.file === "undefined") {
                        image = "user.png";

                    } else {
                        image = req.file.filename
                    }

                    // company = await models.Company.findOne({
                    //     where: {
                    //         name: req.body.company
                    //     }
                    // })


                    const employer = {
                        fullname: req.body.fullname,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash,
                        position: req.body.position,
                        company: req.body.company,
                        img: image,
                        companyID: company.id,
                    };

                    await models.Employer.create(employer).then(result => {
                        res.status(201).json({
                            result: result,
                            message: "Employer created successfully"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",

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
// 2. Login
const login = async (req, res) => {
    await models.Employer.findOne({ where: { email: req.body.email } }).then(employer => {
        if (employer == null) {
            res.status(401).json({
                message: "Invalid credentials!",
                error: 401

            });
        } else {
            bcryptjs.compare(req.body.password, employer.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: employer.email
                    }, process.env.JWT_KEY, function (err, token) {
                        req.session.employer = {
                            id: employer.id,
                            email: employer.email,
                            fullname: employer.fullname,
                            phone: employer.phone,
                            position: employer.position,
                            img: employer.img,
                            company: employer.company,
                            companyID: employer.companyID,

                        };
                        req.session.id = employer.id;
                        req.session.companyID = employer.companyID;
                        console.log(req.session.id);
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                    });
                }
                else {
                    res.status(401).json({
                        message: "Invalid credentials!",
                        error: 401

                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: 500

        });
    });
}
//3. Upload 
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

//4. Show
const show = async (req, res) => {
    const id = req.params.id;

    models.Employer.findByPk(id).then(result => {
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
//5. get all employer
const index = async (req, res) => {

    let page = req.query.page;
    const limit = 5;
    // const offset = 0 + (page - 1) * limit;

    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;

        await models.Employer.findAndCountAll({
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
const destroy = async (req, res) => {
    const id = req.params.id;

    await models.Employer.destroy({ where: { id: id } }).then(result => {
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
//7. Update
const update = async (req, res) => {
    const id = req.params.id;

    if (typeof req.file === "undefined") {
        image = req.params.img;

    } else {
        image = req.file.filename
    }

    const updateEmployer = {
        fullname: req.body.fullname,
        phone: req.body.phone,
        position: req.body.position,
        company: req.body.company,
        companyID: req.body.companyID,
        img: image
    }


    await models.Employer.update(updateEmployer, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            employer: updateEmployer
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong!",
            error: error
        });
    })
}
//8. Total POST
const countPost = async (req, res) => {
    let employerID = req.session.employer.id;
    await models.Post.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', models.sequelize.col('Post.id'))), 'btd'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN status = 1 THEN 1 ELSE 0 END')), 'status1'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN status = 0 THEN 1 ELSE 0 END')), 'status0'],
        ],
        include: [{
            model: models.Employer,
            attributes: ['fullname'],
            where: { id: employerID },
        }],
        raw: true,
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
        }
        )
        console.log(error);
    })
}
//9. Total CV
const countCV = async (req, res) => {
    let employerID = req.session.employer.id;

    await models.CV.count({
        distinct: true,
        attributes: [],
        include: [
            {
                model: models.Post,
                include: [
                    {
                        model: models.Employer,
                        where: { id: employerID },
                    },
                ],
            },
        ],
    })
        .then(result => {
            if (result) {
                res.status(200).json(
                    { total: result }
                );
            }
            else {
                res.status(404).json({
                    message: "Not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi!"
            }
            )
            console.log(error);
        })
}

// 10. Total CV Each Post
const CVEachPost = async (req, res) => {
    await models.Post.findAll({
        attributes: [
            ['id', 'postID'],
            ['headline', 'headline'],
            [models.sequelize.fn('COALESCE', models.sequelize.fn('COUNT', models.sequelize.fn('DISTINCT', models.sequelize.col('cvs.id'))), 0), 'cvCount'],
        ],
        include: [
            {
                model: models.CV,
                attributes: [],
                required: false,
                where: {},
            },
            {
                model: models.Employer,
                attributes: [],
                where: { id: 1 },
            },
        ],
        group: ['Post.id', 'Post.headline'],
        raw: true,
    }).then(result => {
        if (result) {
            res.status(200).json(
                result
            );
        }
        else {
            res.status(404).json({
                message: "Not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi!"
        }
        )
        console.log(error);
    })

}

module.exports = {
    signUp: signUp,
    login: login,
    upload: upload,
    show: show,
    index: index,
    destroy: destroy,
    update: update,
    countPost: countPost,
    countCV: countCV,
    CVEachPost: CVEachPost
}