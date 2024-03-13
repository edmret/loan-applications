# Challenge: Enhanced Loan Application Processing Service

Welcome to the Challenge: Enhanced Loan Application Processing Service. This service is designed to streamline the loan application process, providing a faster and more efficient way to handle loan applications through an automated and user-friendly platform.

## Technology Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger
- **Authentication**: Passport with JWT tokens
- **SWAGGER**: API documentation

## Getting Started

### Prerequisites

Before you begin, ensure you have Docker and Docker Compose installed on your machine. This project uses Docker Compose to simplify the setup and running of the service, making it easy to get up and running without worrying about the intricacies of the environment setup.

### Setup Instructions

1. **Clone the Repository**

   Start by cloning this repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. **Environment Configuration**

   You need to create your own `.env` file for environment variables. For convenience, a `.env.example` file is provided in the repository. Copy the content from `.env.example` to your `.env` file to run the project in development mode.

   ```
   cp .env.example .env
   ```

   After creating your `.env` file from the `.env.example`, you'll need to understand the purpose of each environment variable. Here are some of the key variables:

   - **`RUN_MIGRATIONS`**: This variable controls whether the database migrations should be automatically run when the application starts. Set it to `true` to enable automatic running of migrations. This is useful for ensuring your database schema is up to date without manually applying migrations.

   - **`RUN_DEV_SEEDS`**: When set to `true`, this variable triggers the seeding of development data into your database. This is particularly useful for development and testing purposes, allowing you to work with a pre-populated database.

   Remember to set these variables in your `.env` file according to your needs before starting your application with `docker-compose up`.

3. **Running the Project with Docker Compose**

   With Docker and Docker Compose installed, and your `.env` file ready, you can start the project by running:

   ```
   docker-compose up
   ```

   This command will build and start the necessary containers for the NestJS application and the PostgreSQL database. The containers are configured to work together seamlessly, ensuring that you can start using the application without further setup.

### Accessing the Application

- **Swagger API Documentation**: Once the application is running, you can access the Swagger API documentation at [http://localhost:3000/api](http://localhost:3000/api). The documentation provides a comprehensive guide to the available endpoints, including request parameters and response structures.

### Super Admin Credentials

As part of the development seeds, a super admin user is created with the following credentials:

- **Username:** admin
- **Password:** admin
  This user can be used to access the full list of loans, since all users for now are created as applicants.

Running the Project with Docker Compose
