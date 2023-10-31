const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { Op } = require("sequelize");

//1. Create
const save = async (req, res) => {
    const city = {
        name: req.body.name
    }
    await models.City.create(city).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Thành phố được tạo thành công",
            city: result

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

    const updateCity = {
        name: req.body.name,
    }


    await models.City.update(updateCity, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            city: updateCity
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

    await models.City.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Delete successfully"
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
    let page = req.query.page;
    const limit = 5;

    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;

        models.City.findAndCountAll({
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
        models.City.findAndCountAll({
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
//5. index
const index = async (req, res) => {
    const id = req.params.id;

    await models.City.findByPk(id).then(result => {
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

//6. Search
const search = async (req, res) => {
    const key = req.params.key;


    await models.City.findAll({
        where: {
            [Op.or]: [
                { id: key },
                {
                    name: {
                        [Op.like]: `%${key}%`
                    }
                }
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

//7. Show all
const showall = async (req, res) => {
    await models.City.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Đã xảy ra lỗi"
        });
    });
}

module.exports = {
    save: save,
    update: update,
    destroy: destroy,
    index: index,
    show: show,
    search: search,
    showall: showall
}