# Structure guideline

### routes:
###### Contains routes for API endpoints

### controllers:
###### Contains controllers functions that connect services with routes, and perform certain actions.

### services:
###### Contains services functions that connect database with controllers. Services logic is just used to communicate with databases.

### models:
###### Database models.

### middleware:
###### Contains functions that are executed between specific functions. Such as permissions, token creation, etc.

### tests:
###### Unit test cases.

## File name conventions:
### routes:
###### all lowercase with - between words.
###### name-route.js or name-name-route.js

### controllers:
###### all lowercase with - between words.
###### name-controller.js or name-name-controller.js.

### services:
###### all lowercase with - between words.
###### name-service.js or name-name-service.js.

### models:
###### Name (first letter is capital).

### middleware:
###### all lowercase with - between words.
###### name.js or name-name.js

### tests:
###### all lowercase with - between words.
###### name.test.js or name-name.test.js