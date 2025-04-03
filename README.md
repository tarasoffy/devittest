# devittest

### 1. Clone the Repository
First, clone the project to your local machine:

git clone git@github.com:tarasoffy/devittest.git

cd devittest

git checkout first-commit

### 2. Use Docker to build and run the containers for the backend, frontend, and database:
docker-compose up --build

### 3. Apply Database Migrations
docker-compose exec backend npx prisma migrate deploy

### 4. Connect to PostgreSQL Database
docker-compose exec postgres psql -U username -d database

### 5. Insert Sample Data
INSERT INTO "Product" (id, name, price, stock) 
VALUES (1, 'Laptop', 500, 10);

INSERT INTO "User" (id, name, email, balance) 
VALUES (1, 'User Name', 'user@example.com', 5000);
