# Tech Stack Documentation

## Overview
The technology stack for our book-spotify hybrid websitewill be discussed, along with the functions of each component and our motivations to utilize them. We may need to modify some of the selected libraries and tools as the project expands, so this list is not final.

## Frontend (UI)
### React.js
React.js is a component based architecture provides us a quick and engaging user interface. It works well with API connections and makes it possible to manage user interactions easily.

## Backend (API and Server Logic)
### Express.js (Backend Framework)
React frontend API calls are effectively handled using Express.js. For managing user authentication, book retrieval, and other types of interactions, such as post/get/put/patch, it is lightweight and tremendously flexible. As we used it in our assignments, it functions nicely with PostgreSQL for structured data and MongoDB for unstructured data.

### FastAPI
The Python algorithm for machine learning for book suggestions will be executed using FastAPI. It is faster than Flask and asynchronous. It can manage several simultaneous API queries and works with Redis with ease.

## Databases (Storage and Performance)

### PostgreSQL (Relational Database)
For structured data, such as users, books, transactions, etc., PostgreSQL is fantastic. It is widely used open source, and offers an abundance of learning resources to ensure our database functions correctly.

### MongoDB (NoSQL for comments and reviews and similar data)
MongoDB maintains. Its Bson file structure allows for flexible schemas, and enables the addition of features like reactions without affecting the data that already exists.

### Redis (memory cache for Recommendations)
Redis will improve speed by reducing database queries and storing hot data (data which is requested frequently) for easy retrieval. It serves as a session store to cache user interactions and API replies. We'll also implement a cache flush to remove outdated data and provide space for fresh API requests in order to ensure that we don't run out of memory.

## Recommendation system
### Python (for AI and Data Processing)
python will be used for the ML script which will receive an API call from the main website, generate a recommendations list and return a json output 

## Deployment
### Docker
Docker will be used to run the application modules in containers, this would trivialize deployment.

### Nginx (Reverse Proxy)
to improve performance and security, not sure if we'll have enough time to use it, but it would be a great addition.