# Booktify

Is a website like Spotify, but for books where u can browse, listen, and keep track of your favourite books.


## Running
To run project locally:

first terminal (backend - make sure to run this first)
``` bash
cd Web
cd backend
node server.js
```

second terminal (frontend)
``` bash
cd Web 
npm run dev 
```

alternatively you can install npm install --save-dev concurrently
``` bash
cd Web 
npm run all 
```

## Installation

To install the required dependencies, run the following command:

```bash
npm i react-hook-form 
npm i react-router-dom
npm i bcrypt
npm i axios
npm i express cors
npm i sequelize pg pg-hstore
npm install mongoose
```

#### Dependency usage
- **react-hook-form**: Handling form state and validation
- **react-router-dom**: Enabling routing, navigation, and links in the app
- **bcrypt**: Used for hashing passwords in the database
- **axios**: Used to send requests between backend and frontend elements
- **cors**: allows backend and fronted to interact when they run on different ports