const likeService = require("../services/like-service");
const { validationResult } = require('express-validator');



  //Get number of like for question
const getNumberOfLikeForQuestion = async (req, res) => {
   
    try {
        const questionId = req.params.id
        const like = await likeService.getNumberOfLikeForQuestion(questionId);
        res.status(200).json({"like":like});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

    //Get number of like for comment
  const getNumberOfLikeForComment = async (req, res) => {
   
    try {
        const commentId = req.params.id
        const like = await likeService.getNumberOfLikeForComment(commentId);
        res.status(200).json({"like":like});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

  //Get number of dislike for question
  const getNumberOfDislikeForQuestion = async (req, res) => {
   
    try {
        const questionId = req.params.id
        const like = await likeService.getNumberOfDislikeForQuestion(questionId);
        res.status(200).json({"like":like});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

    //Get number of dislike for comment
  const getNumberOfDislikeForComment = async (req, res) => {
   
    try {
        const commentId = req.params.id
        const like = await likeService.getNumberOfDislikeForComment(commentId);
        res.status(200).json({"like":like});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTopQuestion = async (req, res) => {
  try {
      const like = await likeService.getTopQuestion();

    // sorting funcion 

    const newarr = like.map((item) => {
        return item.questionId
   })
   const count = {};
   newarr.forEach((item) => {
     
   })
  
  
   const c1 = newarr.forEach(element => {
     if(element !==  null || element !== undefined){

       count[element] = (count[element] || 0) + 1;
     }
   });
   
   var sortable = [];
   for (var item in count) {
     if(item !== "null" && item !== null){
       sortable.push({question:parseInt(item), number: count[item]});
     }
   }
   
   sortable.sort(function(a, b) {
       return a[1] - b[1];
   });
   
 
      res.status(200).json(sortable.reverse());
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};


const addLike = async (req, res) => {
    const like = req.body;
    const isLike = await likeService.isLiked(req.body)
    if(isLike){
      return res.status(400).json({ errors:"You are already like!"})
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newLike = await likeService.addLike(like);
        res.status(201).send(newLike);
      } catch (e) {
        res.status(500).send({ message: e.message }).end(); 
      }
    } 
  };


module.exports = {
    getNumberOfLikeForQuestion,
    getNumberOfLikeForComment,
    getTopQuestion,
    addLike,
    getNumberOfDislikeForComment,
    getNumberOfDislikeForQuestion
    
};