const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const clientFetchAllPost = async (req, res) => {
    let page = req.query.page;
    const limit = 10;
    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;
        await models.Post.findAndCountAll({ // Lấy tất cả cột từ bảng Posts
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
            include: [
                {
                    model: models.Company,
                    attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                    where: {
                        id: Sequelize.col('Post.compID'),
                    },
                },
                {
                    model: models.City,
                    attributes: ['name'],
                    where: {
                        id: Sequelize.col('Post.skillID'),
                    },
                },
            ],
            where: {
                status: 1,
            },
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
        await models.Post.findAndCountAll({ // Lấy tất cả cột từ bảng Posts
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
            include: [
                {
                    model: models.Company,
                    attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                    where: {
                        id: Sequelize.col('Post.compID'),
                    },
                },
                {
                    model: models.City,
                    attributes: ['name'],
                    where: {
                        id: Sequelize.col('Post.skillID'),
                    },
                },
            ],
            where: {
                status: 1,
            },
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

const fetchOtherPostCompany = async (req, res) => {
    const id = req.params.id;
    await models.Post.findAll({ // Lấy tất cả cột từ bảng Posts
        attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
        include: [
            {
                model: models.Company,
                attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                where: {
                    id: Sequelize.col('Post.compID'),
                },
            },
            {
                model: models.City,
                attributes: ['name'],
                where: {
                    id: Sequelize.col('Post.skillID'),
                },
            },
        ],
        where: {
            // compID: Sequelize.literal(`(SELECT compID FROM posts WHERE id = ${id})`),
            compID: {
                [Op.eq]: models.sequelize.literal(`(SELECT compID FROM posts WHERE id = ${id})`),
            },
            id: { [Op.ne]: parseInt(id, 11) },
            status: 1,
        },

    })
        .then(result => {
            res.status(201).json({
                // Post created successfully
                message: "Post dislayed!",
                post: result

            });
        }).catch(error => {
            res.status(500).json({
                // Something went wrong
                message: "Something went wrong!",
                error: error

            });
        });
}

//6. Search
const searchPost = async (req, res) => {
    let text = req.query.text;
    const skillID = req.query.skillID;
    const workform = req.query.workform;
    console.log('value of key', text);

    await models.Post.findAll({
        attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
        include: [
            {
                model: models.Company,
                attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                where: {
                    id: Sequelize.col('Post.compID'),
                },
            },
            {
                model: models.City,
                attributes: ['name'],
                where: {
                    id: Sequelize.col('Post.skillID'),
                },
            },
        ],
        where: {
            status: 1,
            [Op.or]: [
                { headline: { [Op.like]: `%${text}%` } },
                { require: { [Op.like]: `%${text}%` } },
                { des: { [Op.like]: `%${text}%` } },
                { workform: { [Op.like]: `%${workform}%` } },
                { skillID: { [Op.like]: `%${skillID}%` } }
            ]


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
    });
}

// Upload
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
        const fileTypes = /pdf|doc|docx/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('img')


const Apply = async (req, res) => {
    const cv = {
        img: req.file.filename,
        jobSeekerID: req.session.jobseeker.id,
        desc: req.body.desc,
        postID: req.body.postID
    }
    await models.CV.create(cv).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "CV đã được nộp thành công",
            cv: result

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

//trang chu job
const HomeFetchPost = async (req, res) => {
    let page = req.query.page;
    const limit = 5;
    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;
        await models.Post.findAndCountAll({ // Lấy tất cả cột từ bảng Posts
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
            include: [
                {
                    model: models.Company,
                    attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                    where: {
                        id: Sequelize.col('Post.compID'),
                    },
                },
                {
                    model: models.City,
                    attributes: ['name'],
                    where: {
                        id: Sequelize.col('Post.skillID'),
                    },
                },
            ],
            where: {
                status: 1,
            },
            order: [['createdAt', 'DESC']],
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
        await models.Post.findAndCountAll({ // Lấy tất cả cột từ bảng Posts
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
            include: [
                {
                    model: models.Company,
                    attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                    where: {
                        id: Sequelize.col('Post.compID'),
                    },
                },
                {
                    model: models.City,
                    attributes: ['name'],
                    where: {
                        id: Sequelize.col('Post.skillID'),
                    },
                },
            ],
            where: {
                status: 1,
            },
            order: [['createdAt', 'DESC']],
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

const fetchPostOfCompany = async (req, res) => {
    const id = req.params.id;
    await models.Post.findAll({ // Lấy tất cả cột từ bảng Posts
        attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
        include: [
            {
                model: models.Company,
                attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                where: {
                    id: Sequelize.col('Post.compID'),
                },
            },
            {
                model: models.City,
                attributes: ['name'],
                where: {
                    id: Sequelize.col('Post.skillID'),
                },
            },
        ],
        where: {
            // compID: Sequelize.literal(`(SELECT compID FROM posts WHERE id = ${id})`),
            compID: id,
            status: 1,
        },

    })
        .then(result => {
            res.status(201).json({
                // Post created successfully
                message: "Post dislayed!",
                post: result

            });
        }).catch(error => {
            res.status(500).json({
                // Something went wrong
                message: "Something went wrong!",
                error: error

            });
        });
}

const fetchJSOfPost = async (req, res) => {
    let id = req.params.postID;
    await models.CV.findAll({
        include: [
            {
                model: models.JobSeeker,
                attributes: ['fullname'],
                where: {
                    id: Sequelize.col('CV.jobSeekerID'),
                },

            }
        ],
        where: {
            postID: id
        }

    })
        .then(result => {
            res.status(201).json({
                // Post created successfully
                message: "Post dislayed!",
                cv: result

            });
        }).catch(error => {
            res.status(500).json({
                // Something went wrong
                message: "Có lỗi xảy ra!",
                error: error

            });
        });
}
//History Apply
// const historyApply = async (req, res) => {
//     let ntv = req.session.jobseeker.id;
//     await models.CV.findAndCountAll({
//         attributes: ['id', 'desc', 'img', 'createdAt'],

//         include: [
//             {
//                 model: models.Post,
//                 attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
//                 include: [{
//                     model: models.Company,
//                     attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
//                     where: {
//                         id: Sequelize.col('Post.compID'),
//                     },
//                 },
//                 {
//                     model: models.City,
//                     attributes: ['name'],
//                     where: {
//                         id: Sequelize.col('Post.skillID'),
//                     },
//                 },

//                 ],
//                 where: {
//                     id: Sequelize.col('CV.postID'),
//                 },
//             },
//         ],
//         where: {
//             jobSeekerID: ntv
//         },

//     })
//         .then(result => {
//             res.status(201).json({
//                 // Post created successfully
//                 message: "History dislayed!",
//                 post: result

//             });
//         }).catch(error => {
//             res.status(500).json({
//                 // Something went wrong
//                 message: "Something went wrong!",
//                 error: error

//             });
//         });

// }
const historyApply = async (req, res) => {
    let ntv = req.session.jobseeker.id;
    await models.Post.findAndCountAll({ // Lấy tất cả cột từ bảng Posts
        attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des', 'benefit', 'quantity', 'skillID', 'address', 'workform', 'status', 'DeadlineSubmission', 'createdAt'],
        include: [
            {
                model: models.CV,
                attributes: ['id', 'desc', 'postID', 'img', 'createdAt'],
                where: {
                    postID: Sequelize.col('Post.id'),
                    jobSeekerID: ntv
                },
            },
            {
                model: models.Company,
                attributes: ['id', 'name', 'logo', 'address', 'worktime', 'country', 'description', 'website', 'scale', 'skill'],
                where: {
                    id: Sequelize.col('Post.compID'),
                },
            },
            {
                model: models.City,
                attributes: ['name'],
                where: {
                    id: Sequelize.col('Post.skillID'),
                },
            },

        ],


    })
        .then(result => {
            res.status(201).json({
                // Post created successfully
                message: "Post dislayed!",
                post: result

            });
        }).catch(error => {
            res.status(500).json({
                // Something went wrong
                message: "Something went wrong!",
                error: error

            });
        });

}
module.exports = {
    clientFetchAllPost: clientFetchAllPost,
    fetchOtherPostCompany: fetchOtherPostCompany,
    searchPost: searchPost,
    Apply: Apply,
    upload: upload,
    HomeFetchPost: HomeFetchPost,
    fetchPostOfCompany: fetchPostOfCompany,
    fetchJSOfPost: fetchJSOfPost,
    historyApply: historyApply
}