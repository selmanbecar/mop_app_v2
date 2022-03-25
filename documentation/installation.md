# Installation guideline

### Step 1.
###### In terminal or command prompt clone project.
    `git clone https://github.com/selmanbecar/mop_app_v2.git`
### Step 2.
###### Enter into project root folder using terminal or command prompt.
    `cd `
### Step 3.
###### Add .env file into root of project.
    `
        DB_NAME=mop_app_v2
        DB_USERNAME=root
        DB_PASSWORD=rootroot
        JWT_SECRET=DK3s745g@dsl1?1
    `
### Step 4.
###### Start project using terminal or command prompt.
    `docker-compose up --build`

### Step 5.
###### Initialize database .
    `docker-compose run mopappv2 node config/initialize.js 

### Step 6.
###### To run unit test type .
    `docker-compose run mopappv2 npm test`
