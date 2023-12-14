const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
//1. Update Infor
const updateInfor = async (req, res) => {

    const id = req.params.id;
    if (typeof req.file === "undefined") {
        image = req.session.jobseeker.img;

    } else {
        image = req.file.filename
    }
    const infor = {
        img: image,
        fullname: req.body.fullname,
        email: req.body.email,
        position: req.body.position,
        gender: req.body.gender,
        phone: req.body.phone,
        link: req.body.link,
        address: req.body.address,
        birthday: req.body.birthday,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVInfor.update(infor, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "CV đã được cập nhất thành công",
            infor: infor

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

//2. Update Edu
const updateEdu = async (req, res) => {
    const id = req.params.id;
    const edu = {
        school: req.body.school,
        major: req.body.major,
        start: req.body.start,
        end: req.body.end,
        present: req.body.present,
        more: req.body.more,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVEducation.update(edu, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Học vấn đã cập nhật thành công",
            edu: edu

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//3. Update Career Obj
const updateObj = async (req, res) => {
    const id = req.params.id;
    const obj = {
        obj: req.body.obj,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVCareerObj.update(obj, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Mục tiêu nghề nghiệp cập nhật được tạo thành công",
            obj: obj

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

//4. Update Certification
const updateCer = async (req, res) => {
    const id = req.params.id;
    const cer = {
        name: req.body.name,
        time: req.body.time,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVCertification.update(cer, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Chứng chỉ đã được cập nhật thành công",
            cer: cer

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//5. Update Award
const updateArward = async (req, res) => {
    const id = req.params.id;
    const award = {
        name: req.body.name,
        time: req.body.time,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVAward.update(award, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Giải thưởng đã được cập nhật thành công",
            award: award

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//6. Update Interest
const updateInterest = async (req, res) => {
    const id = req.params.id;
    const interest = {
        des: req.body.des,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVInterest.update(interest, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Sở thích đã cập nhật tạo thành công",
            interest: interest

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//7. Update Skill
const updateSkill = async (req, res) => {
    const id = req.params.id;
    const skill = {
        name: req.body.name,
        des: req.body.des,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVSkill.update(skill, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Kỹ năng đã được cập nhật thành công",
            skill: skill

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//8. Update Interest
const updateEpx = async (req, res) => {
    const id = req.params.id;
    const exp = {
        position: req.body.position,
        company: req.body.company,
        start: req.body.start,
        end: req.body.end,
        present: req.body.present,
        des: req.body.des,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVWorkExp.update(exp, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Kinh nghiệm làm việc đã cập nhật thành công",
            exp: exp

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//9. Update Interest
const updateActivity = async (req, res) => {
    const id = req.params.id;
    const activity = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        des: req.body.des,
        // JobSeekerID: req.session.jobseeker.id
    }
    await models.CVActivity.update(activity, { where: { id: id } }).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Hoạt động đã được cập nhật thành công",
            activity: activity

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

//10. Create Education
const createEdu = async (req, res) => {
    const edu = {
        school: req.body.school,
        major: req.body.major,
        start: req.body.start,
        end: req.body.end,
        present: req.body.present,
        more: req.body.more,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVEducation.create(edu).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Học vấn đã tạo thành công",
            edu: edu

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//11. Create Certification
const createCer = async (req, res) => {
    const cer = {
        name: req.body.name,
        time: req.body.time,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVCertification.create(cer).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Chứng chỉ đã được tạo thành công",
            cer: cer

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//12. Create Award
const createArward = async (req, res) => {
    const award = {
        name: req.body.name,
        time: req.body.time,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVAward.create(award).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Giải thưởng đã được tạo thành công",
            award: award

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//13. Create Skill
const createSkill = async (req, res) => {
    const skill = {
        name: req.body.name,
        des: req.body.des,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVSkill.create(skill).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Kỹ năng đã được tạo thành công",
            skill: skill

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//14. Create Interest
const createEpx = async (req, res) => {
    const exp = {
        position: req.body.position,
        company: req.body.company,
        start: req.body.start,
        end: req.body.end,
        present: req.body.present,
        des: req.body.des,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVWorkExp.create(exp).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Kinh nghiệm làm việc đã tạo thành công",
            exp: exp

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}
//15. Create Interest
const createActivity = async (req, res) => {
    const activity = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        des: req.body.des,
        JobSeekerID: req.session.jobseeker.id
    }
    await models.CVActivity.create(activity).then(result => {
        res.status(201).json({
            // Post created successfully
            message: "Hoạt động đã được tạo thành công",
            activity: activity

        });
    }).catch(error => {
        res.status(500).json({
            // Something went wrong
            message: "Đã xảy ra lỗi",
            error: error

        });
    });
}

//==============================================Display
const fetchInfo = async (req, res) => {
    const id = req.session.jobseeker.id
    await models.CVInfor.findOne({

        where: { JobSeekerID: id },
        include: [{
            model: models.JobSeeker,
            attributes: ['fullname', 'img', 'email'],
            where: {
                id: Sequelize.col('CVInfor.JobSeekerID'),
            },
        }
        ]
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
            });
        });
}
const fetchObj = async (req, res) => {
    const id = req.session.jobseeker.id;
    await models.CVCareerObj.findOne({
        where: { JobSeekerID: id },
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
            });
        });
}
const fetchEdu = async (req, res) => {
    const id = req.session.jobseeker.id;
    await models.CVEducation.findAll({
        where: { JobSeekerID: id },
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
            });
        });
}
const fetchSkill = async (req, res) => {
    const id = req.session.jobseeker.id;
    await models.CVSkill.findAll({
        where: { JobSeekerID: id },
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
            });
        });
}
const fetchExp = async (req, res) => {
    const id = req.session.jobseeker.id;
    await models.CVWorkExp.findAll({
        where: { JobSeekerID: id },
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
            });
        });
}


//3. Delete
const destroyEdu = async (req, res) => {
    const id = req.params.id;

    await models.CVEducation.destroy({ where: { id: id } }).then(result => {
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
const destroySkill = async (req, res) => {
    const id = req.params.id;

    await models.CVSkill.destroy({ where: { id: id } }).then(result => {
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
const destroyExp = async (req, res) => {
    const id = req.params.id;

    await models.CVWorkExp.destroy({ where: { id: id } }).then(result => {
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

// Render CV
const viewFullCV = async (req, res) => {
    const idSeesion = req.session.jobseeker.id;

    await models.JobSeeker.findAll({
        attributes: ['fullname', 'email'],
        include: [
            {
                model: models.CVInfor,
                attributes: ['fullname', 'img', 'email', 'position', 'gender', 'phone', 'link', 'address', 'birthday'],
                where: {
                    JobSeekerID: Sequelize.col('JobSeeker.id'),
                }
            },
            {
                model: models.CVEducation,
                attributes: ['school', 'major', 'start', 'end', 'present', 'more'],
                where: {
                    JobSeekerID: Sequelize.col('JobSeeker.id'),
                }
            },
            {
                model: models.CVCareerObj,
                attributes: ['obj'],
                where: {
                    JobSeekerID: Sequelize.col('JobSeeker.id'),
                }
            },
            {
                model: models.CVSkill,
                attributes: ['name', 'des'],
                where: {
                    JobSeekerID: Sequelize.col('JobSeeker.id'),
                }
            },
            {
                model: models.CVWorkExp,
                attributes: ['position', 'company', 'start', 'end', 'present', 'des'],
                where: {
                    JobSeekerID: Sequelize.col('JobSeeker.id'),
                }
            },
        ],
        where: {
            id: idSeesion
        }
    })
        .then(result => {
            res.status(200).json({
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi"
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
    updateInfor: updateInfor,
    upload: upload,
    updateEdu: updateEdu,
    updateObj: updateObj,
    updateCer: updateCer,
    updateArward: updateArward,
    updateInterest: updateInterest,
    updateSkill: updateSkill,
    updateEpx: updateEpx,
    updateActivity: updateActivity,
    createEdu: createEdu,
    createCer: createCer,
    createArward: createArward,
    createSkill: createSkill,
    createEpx: createEpx,
    createActivity: createActivity,
    fetchInfo: fetchInfo,
    fetchObj: fetchObj,
    fetchEdu: fetchEdu,
    destroyEdu: destroyEdu,
    fetchSkill: fetchSkill,
    destroySkill: destroySkill,
    fetchExp: fetchExp,
    destroyExp: destroyExp,
    viewFullCV: viewFullCV
}