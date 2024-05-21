# Hotels Inertia

<p align="center">
<a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a>
</p>

## Installation

To install the project, you need to follow the steps below:

1. Clone the repository:

        git clone

2. Enter the project folder:

        cd hotels-inertia

3. Install the dependencies:

        composer install
   
        # AND
   
        npm install

5. Create the `.env` file:

       cp .env.example .env

6. Generate the application key:

       php artisan key:generate

7. Configure the database in the `.env` file:

        DB_CONNECTION=mysql
        DB_HOST=
        DB_PORT=
        DB_DATABASE=
        DB_USERNAME=
        DB_PASSWORD=

8. Run the migrations:

        php artisan migrate
        # OR
        php artisan migrate --seed

9. Run the server:

        php artisan serve --host=0.0.0.0 --port=8000
   
        # AND
   
        npm run dev

10. Open the app and enjoy the hotels project - Inertia version!
