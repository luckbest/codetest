Codetest
Run application


1. API (default localhost:8000)

-- run migration sentry
php artisan migrate --package=cartalyst/sentry
php artisan config:publish cartalyst/sentry
php artisan  migrate
php artisan db:seed




2. Admin (angularjs- default grunt localhost:9000)

