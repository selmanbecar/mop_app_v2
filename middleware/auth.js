const jwt = require('jsonwebtoken');


//Middleware that check is user login (is token in header is valid)
const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            // 401
            res.status(401).json({ msg: 'Unauthorized access!' }).end();
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;