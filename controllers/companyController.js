const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');


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
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('logo')

//1. Create
const save = async (req, res) => {
    const company = {
        name: req.body.name,
        logo: req.file.filename,
        address: req.body.address,
        worktime: req.body.worktime,
        country: req.body.country,
        description: req.body.description,
        website: req.body.website,
        scale: req.body.scale,
        skill: req.body.skill,
        skillID: req.body.skillID,
    }
    await models.Company.create(company).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Công ty được tạo thành công",
            company: result

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

// 2. Update
const update = async (req, res) => {
    const id = req.params.id;

    if (typeof req.file === "undefined") {
        image = req.params.img;

    } else {
        image = req.file.filename
    }

    const updateCompany = {
        name: req.body.name,
        logo: image,
        address: req.body.address,
        worktime: req.body.worktime,
        country: req.body.country,
        description: req.body.description,
        website: req.body.website,
        scale: req.body.scale,
        skill: req.body.skill,
        skillID: req.body.skillID,
    }


    await models.Company.update(updateCompany, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            company: updateCompany
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong!",
            error: error
        });
    })
}
//3. Delete
const destroy = async (req, res) => {
    const id = req.params.id;

    await models.Company.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Delete successfully",
            // jobseeker: result
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong!",
            error: error
        });
    });
}
//4. show
const show = async (req, res) => {
    await models.Company.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi"
        });
    });
}
//5. index
const index = async (req, res) => {
    const id = req.params.id;
    await models.Company.findByPk(id).then(result => {
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
//6. Select employer
// One to many





module.exports = {
    save: save,
    upload: upload,
    update: update,
    destroy: destroy,
    index: index,
    show: show
}