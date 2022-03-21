const { User } = require('../config/db');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async () => {
    
        return await User.findAll();
};


// Get single user
const getUser = async (id) => {
   
        return await User.findByPk(id);
        
    
};

const doesUserExist = async (email) => {
   
  return await User.findOne({where:{email}});
  

};

// Add new user
const addUser = async (user) => {
        const usr = await User.findOne({ where: { email: user.email } });
        if (usr) throw Error('User exists!');
    
        return bcrypt.hash(user.password, 10).then(async (hash) => {
          user.password = hash;
          return User.create(user).catch((err3) => {
            throw err3.message || 'Error creating new user!';
          });
        });  
}; 

//Edit user by id
const editUser = async (id, user) => {
        
        return await User.update(
                  { ...user },
                {
                  where: {
                    id,
                  },
                }
              ).catch((err) => {
                throw err.message || 'Error updating user!';
              });
    }

// Delete user by id
const deleteUser = async (id) => {

        return await User.destroy({ where: { id } }).catch((err) => {
        throw err || 'Error deleting users!';
        });       
   
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    doesUserExist
};