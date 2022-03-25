const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../config/db');

const createToken = (user) => {
    const payload = {
        user: {
            id: user.id,
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

const loginUsers = async (email,password) => {
 
    const user = await User.findOne({ where: { email } });
     
    if (!user) {
      throw new Error("User doesn't exist!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Error logging in!');
    }

    return createToken(user);
  
    }


module.exports = {
    loginUsers,
    createToken,
};