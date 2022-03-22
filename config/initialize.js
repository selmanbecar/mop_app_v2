const { connection, User, Question, Comment } = require('./db');
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

  const questions = [
    {
      
      userId: 1,
      title: "some title",
      description:"some desc"


    },
  ];

  await Question.bulkCreate(questions);

  const comments = [
    {
      
      userId: 1,
      questionId: 1,
      comment:"some comment"


    },
  ];

  await Comment.bulkCreate(comments);

  const likes = [
    {
      
      userId: 1,
      questionId: 1,
      isQuestion:true,
      isLike:true


    },
  ];

  await Comment.bulkCreate(comments);
 

};

connection.sync({ force: false }).then(() => {
  initialize()
    .then(() => {
      console.log('Initialized database');
    })
    .catch((e) => console.log(e));
});
