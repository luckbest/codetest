
Run  Codetest application


1. API (default localhost:8000)
composer update


-- run migration sentry
php artisan migrate --package=cartalyst/sentry
php artisan config:publish cartalyst/sentry
php artisan  migrate
php artisan db:seed




2. Angular (angularjs- default grunt localhost:9000)
npm install
bower install


3. Test users:

admin@admin.com / password
lupr@admin.com / password


