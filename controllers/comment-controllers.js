const commentService = require("../services/comment-service");
const userService = require("../services/user-service");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateOwner = (userId, token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user.id.toString() === userId.toString()
  };

  //Get comment by question
const getComments = async (req, res) => {
   
    try {
        const questionId = req.params.id
        const comments = await commentService.getComments(questionId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTopUser = async (req, res) => {
  try {
      const comment = await commentService.getTopUser();

    // sorting funcion 

    const newarr = comment.map((item) => {
      return item.userId
   })
   const count = {};
   
   const c1 = newarr.forEach(element => {
     count[element] = (count[element] || 0) + 1;
   });
   
   var sortable = [];
   for (var item in count) {
       sortable.push({user:parseInt(item), number: count[item]});
   }
   
   sortable.sort(function(a, b) {
       return a[1] - b[1];
   });
   
 
      res.status(200).json(sortable.reverse());
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};

const getComment = async (req, res) => {
    try {
        const comment = await commentService.getComment(req.params.id);
        if(!comment){
            throw new Error("Comment does not exist!")
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const addComment = async (req, res) => {
    const comment = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newComment = await commentService.addComment(comment);
        res.status(201).send(newComment);
      } catch (e) {
        res.status(500).send({ message: e.message }).end();
      }
    } 
  };

const editComment = async (req, res) => {
    const { id } = req.params;
  const newComment = req.body;
  const token = req.header('x-auth-token');

  try {
    
    const comment = await commentService.getComment(id);
    if (!comment) {
      res.status(404).send({ message: "Comment doesn't exist!" }).end();
    }
    if (validateOwner(comment.userId, token)) {

      await commentService.editComment(id, newComment);

      const editedComment = await commentService.getComment(id);
      res.send(editedComment).end();
    } else {
      res
        .status(403)
        .send({ message: 'You are not owner of this Comment!' })
        .end();
    }
  } catch (e) {
    res.status(500).send({ message: e.message }).end();
  }
};

const deleteComment = async (req, res) => {
    try {
      const comment = await commentService.deleteComment(req.params.id);
      if (!comment) {
        res.status(404).send({ message: 'Comment not found!' }).end();
        return;
      }
      res.send({ message: 'Comment is deleted!' }).end();
    } catch (e) {
        res.status(500).send({ message: e.message }).end();
    }
  };

module.exports = {
    getComments,
    getComment,
    addComment,
    editComment,
    deleteComment,
    getTopUser
};