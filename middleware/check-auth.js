const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.employerData = decodedToken;
        next();
    }
    catch (e) {
        return res.status(401).json({
            'message': "Invalid or expried token provided!",
            'error': e
        });
    }
}





module.exports = {
    checkAuth: checkAuth
}