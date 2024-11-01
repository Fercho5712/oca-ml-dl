# Supply Chain ML Backend

This is the Django backend for the Supply Chain ML project.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser:
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

The API will be available at http://localhost:8000/api/

## Environment Variables

Create a `.env` file in the backend directory with:

```
DJANGO_SECRET_KEY=your-secret-key-here
```