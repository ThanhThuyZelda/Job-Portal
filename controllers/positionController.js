const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

//1. Create
const save = async (req, res) => {
    const position = {
        name: req.body.name
    }
    await models.Position.create(position).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Position created successfully!",
            position: result

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Something went wrong!",
            error: error

        });
    });
}

// 2. Update
const update = async (req, res) => {
    const id = req.params.id;

    const updatePosition = {
        name: req.body.name,
    }


    await models.Position.update(updatePosition, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            position: updatePosition
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

    await models.Position.destroy({ where: { id: id } }).then(result => {
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

        models.Position.findAndCountAll({
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
        models.Position.findAndCountAll({
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

    await models.Position.findByPk(id).then(result => {
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
            message: "Something went wrong!"
        })
    });
}
module.exports = {
    save: save,
    update: update,
    destroy: destroy,
    index: index,
    show: show
}