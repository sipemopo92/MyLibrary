# MyLibrary


## System Requirements

Before you begin, make sure you have the following system requirements:

- Node.js 
- NPM 
- PHP
- Composer


## Installation

Follow the instructions below to install the application:

1. Clone the GitHub repository on your computer: `git clone https://github.com/sipemopo92/MyMovieList.git`
2. Open a terminal window in the project directory.
3. Install the backend dependencies: `composer install`
4. Create the `.env` file: `cp .env.example .env`
5. Generate the Laravel application key: `php artisan key:generate`
7. Configure the database settings in the .env file:
8. Create the database and seed it with sample data: `php artisan migrate`
9. Generate the JWT secret: `php artisan jwt:secret`
9. Install the frontend dependencies: `npm install`


## Running the app

Follow the instructions below to run the application:

1. Open two terminal windows in the project directory.
2. In one of the terminal windows, run the following command to start the Laravel development server: `php artisan serve`
3. In the other terminal window, run the following command to start the Angular development server: `ng serve`
4. Open your web browser and go to the following address: `http://localhost:4200`



## Conclusion

These are the instructions to install and try the web application with Angular frontend and Laravel backend on your computer. If you encounter any issues during the installation or running of the app, check the official documentation of Angular and Laravel or ask for help from the community.

