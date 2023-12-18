const Validator = require('fastest-validator');
const models = require('../models');
const Sequelize = require('sequelize');

const save = async (req, res) => {
    const post = {
        headline: req.body.headline,
        salary: req.body.salary,
        gender: req.body.gender,
        require: req.body.require,
        des: req.body.des,
        benefit: req.body.benefit,
        quantity: req.body.quantity,
        address: req.body.address,
        workform: req.body.workform,
        empID: req.session.employer.id,
        compID: req.session.employer.companyID,
        skillID: req.body.skillID,
        status: req.body.status,
        DeadlineSubmission: req.body.DeadlineSubmission,
    }
    await models.Post.create(post).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Post created successfully!",
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

// 2. Update
const update = async (req, res) => {
    const id = req.params.id;


    const updatePost = {
        headline: req.body.headline,
        salary: req.body.salary,
        gender: req.body.gender,
        require: req.body.require,
        des: req.body.des,
        benefit: req.body.benefit,
        quantity: req.body.quantity,
        address: req.body.address,
        workform: req.body.workform,
        empID: req.session.employer.id,
        compID: req.session.employer.companyID,
        skillID: req.body.skillID,
        status: req.body.status,
        DeadlineSubmission: req.body.DeadlineSubmission,
    }

    await models.Post.update(updatePost, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Update successfully! ",
            post: updatePost
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

    await models.Post.destroy({ where: { id: id } }).then(result => {
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

//5. index
const index = async (req, res) => {
    const id = req.params.id;

    await models.Post.findByPk(id).then(result => {
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

//4. show
const show = async (req, res) => {


    let id = req.session.employer.id;
    let page = parseInt(req.query.page, 10) || 1;
    const limit = 9;
    console.log("page: ", page);
    if (page == null) {
        page = 1;
        // const limit = 1;
        const offset = 0 + (page - 1) * limit;

        models.Post.findAndCountAll({
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des',
                'benefit', 'quantity', 'address', 'workform', 'empID', 'compID', 'skillID', 'status', 'DeadlineSubmission', 'createdAt', 'updatedAt'],
            where: {
                empID: id
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
        models.Post.findAndCountAll({
            attributes: ['id', 'headline', 'salary', 'gender', 'require', 'des',
                'benefit', 'quantity', 'address', 'workform', 'empID', 'compID', 'skillID', 'status', 'DeadlineSubmission', 'createdAt', 'updatedAt'],
            where: {
                empID: id
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




module.exports = {
    save: save,
    update: update,
    destroy: destroy,
    show: show,
    index: index,

}