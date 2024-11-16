# Supply Chain ML Backend

This is the Django backend for the Supply Chain ML project.

## Prerequisites

1. Install PostgreSQL and PostGIS:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib postgis

# macOS with Homebrew
brew install postgresql postgis

# Windows
# Download and install PostgreSQL with PostGIS from EnterpriseDB
```

2. Create the spatial database:
```bash
createdb supply_chain_db
psql supply_chain_db
CREATE EXTENSION postgis;
```

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

3. Set up environment variables in .env:
```
DJANGO_SECRET_KEY=your-secret-key-here
DB_NAME=supply_chain_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The API will be available at http://localhost:8000/api/