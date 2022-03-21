require('dotenv').config();
const { connection, User } = require('./db');
const bcrypt = require('bcrypt');


// Initialize script for creating database.
let email = "selmanbecar@gmail.com"
let password ="selmanpass"


const hashPassword = () => {
  return bcrypt.hash(password, 10).then((hash) => {
    password = hash
    });

}
hashPassword()



const initialize = async () => {


  const users = [
    {
      
      email: email,
      password: password,


    },
  ];

  await User.bulkCreate(users);

 

};

connection.sync({ force: false }).then(() => {
  initialize()
    .then(() => {
      console.log('Initialized database');
    })
    .catch((e) => console.log(e));
});
