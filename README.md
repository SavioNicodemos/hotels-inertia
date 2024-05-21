# Hotels Inertia

<p align="center">
<a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a>
</p>

## Installation

To install the project, you need to follow the steps below:

1. Clone the repository:

        ```bash
        git clone
        ```

2. Enter the project folder:

        ```bash
        cd hotels-inertia
        ```

3. Install the dependencies:

        ```bash
        composer install
        # and also
        npm install
        ```

4. Create the `.env` file:

       ```bash
       cp .env.example .env
       ```

5. Generate the application key:

       ```
       php artisan key:generate
       ```

6. Configure the database in the `.env` file:

        ```
        DB_CONNECTION=mysql
        DB_HOST=
        DB_PORT=
        DB_DATABASE=
        DB_USERNAME=
        DB_PASSWORD=
        ```

7. Run the migrations:

        ```bash
        php artisan migrate
        # OR
        php artisan migrate --seed
        ```

8. Run the server:

        ```bash
        php artisan serve --host=0.0.0.0 --port=8000
        # and also
        npm run dev
        ```

9. Open the app and enjoy the hotels project - Inertia version!
