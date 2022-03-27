# API endpoints guideline

## Swagger docs on localhost:5000/doc

## Create User / Register

`
Route: /api/users
Method: POST
body-type:JSON
body:{
"first_name":"test",
"last_name":"test",
"email":"test@test.com",
"password":"testtest"
}

`

## Login

`
Route: /api/users
Method: POST
body-type:JSON
body:{
"email":"test@test.com",
"password":"testtest"
}

`

## Get all Users

`
Route: /api/users
Method: GET

`

## Get single User

`
Route: /api/users/:id
Method: GET

`

## Edit User

`
Route: /api/users/:id
Method: PATCH
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"first_name":"test",
"last_name":"test",
"email":"test@test.com",
"password":"testtest"
}

`

## Delete User

`
Route: /api/users/:id
Method: DELETE  
header:{
"x-auth-token":token
}

## Add Question

`
Route: /api/questions
Method: POST
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"userId":1,
"title":"testtest",
"description":"desc"
}

`

## Get all Questions

`
Route: /api/questions
Method: GET

`

## Get all Questions by user

`
Route: /api/questions/user
header:{
"x-auth-token":token
}
Method: GET

`

## Get single Question

`
Route: /api/questions/:id
Method: GET

`

## Edit Question

`
Route: /api/questions/:id
Method: PATCH
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"title":"test",
"description":"test",
}

`

## Delete Question

`
Route: /api/questions/:id
Method: DELETE  
header:{
"x-auth-token":token
}

## Add Comment

`
Route: /api/comments
Method: POST
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"userId":4,
"questionId":5,
"comment":"this is my comment"
}

`

## Get all Comment by question id

`
Route: /api/comments/question/:id  
Method: GET

`

## Get single comment

`
Route: /api/comments/:id
Method: GET

`

## Get Top users

`Route: /api/comments/users Method: GET`

## Edit Comment

`
Route: /api/comments/:id
Method: PATCH
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"comment":"test"
}

`

## Delete Comments

`
Route: /api/comments/:id
Method: DELETE  
header:{
"x-auth-token":token
}

## Add Likes

`
Route: /api/likes
Method: POST
header:{
"x-auth-token":token
}
body-type:JSON
body:{
"userId":2,
"commentId":2,
"isLike":"false",
"isQuestion":"false",
"questionId":null
}

`

## Get Top question

`
Route: /api/likes/question
Method: GET

`

## Get number of like for question

`
Route: /api/likes/question/:id
Method: GET

`

## Get number of dislike for question

`
Route: /api/likes/question/dislike/:id
Method: GET

`

## Get number of like for comment

`
Route: /api/likes/comment/:id
Method: GET

`

## Get number of dislike for comment

`
Route: /api/likes/comment/dislike/:id
Method: GET

`

## Get Notification by userId

`
Route: /api/notifications/:userId
Method: GET

`

## Delete Notifications by userId

`
Route: /api/notifications/:userId
Method: DELETE  
header:{
"x-auth-token":token
}
