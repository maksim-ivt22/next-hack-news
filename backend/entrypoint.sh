set -e

echo "migrate"
python manage.py migrate --noinput

echo "collect static"
python manage.py collectstatic --noinput

echo "Start gunicorn"
gunicorn config.wsgi:application --bind 0.0.0.8000
