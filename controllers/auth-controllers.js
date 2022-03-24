const AuthService = require("../services/auth-service");
const UserService = require("../services/user-service");
const jwt = require("jsonwebtoken");


// login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        try {
            const token = await AuthService.loginUsers(email, password);
            res.status(200).send({ token }).end();
        } catch (err) {
            res.status(404).send({"error":"Your email or password are incorrect!"});
        }
    } catch (error) {
        
        res.status(500).send(error);
    }
};

// register function
const register = async (req, res) => {
    const user = req.body;
    if (!user.email) {
        res
            .status(404)
            .send({
                error: "Email can not be empty!",
            })
            .end();
        return;
    }

    try {
        if (await UserService.doesUserExist(user.email))
            throw { error: "Email already exists!" };
        const newUser = await UserService.addUser(user);
        const token = AuthService.createToken(newUser);
        res.status(201).send({ token, user: newUser });
    } catch (error) {
        res.status(400).send(error).end();
    }
};

// function which check is jwt correct and ok
const validate = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized access!" }).end();
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send(decoded.user);
    } catch (error) {
        res.status(401).send({ error: "Invalid token!" });
    }
};

module.exports = {
    login,
    register,
    validate,
};