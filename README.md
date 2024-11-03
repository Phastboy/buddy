# Buddy

Buddy is a platform designed to enhance learning for students, with features focused on resource organization, study space discovery, and easy management for admins. Built using a microservices architecture, Buddy ensures secure, scalable backend operations with technologies like NestJS, MongoDB, Redis, JWT, and RabbitMQ.

## Features

- **User Authentication**: Secure login with local and OAuth (Google, Facebook) support.
- **Shelves**: Personalized educational resource collections for streamlined access.
- **Crowd-sourced Study Space Locator**: Locate, review, and share study spaces based on user-contributed recommendations.
- **Admin Dashboard**: Centralized management for users, resources, and study spaces.

## Architecture

Buddy’s backend follows a microservices architecture managed within a monorepo using Turborepo. Each service operates independently to enhance modularity, maintainability, and scalability, with inter-service communication facilitated by RabbitMQ. Swagger documentation has been set up for easy API reference.

### Services Overview

1. **Authentication Service**:
   - Manages user registration, login, and JWT issuance.
   - Configured with Passport.js for local authentication and RabbitMQ for microservices communication.
   
2. **Shelves Service**:
   - Provides functionality for users to add, manage, and organize educational resources.
   
3. **Study Space Locator Service**:
   - Handles the addition, review, and search of study spaces by users.

4. **Buddy Service**:
   - Serves as the central hub, aggregating data from other services.
   - Houses the admin dashboard and exposes the unified API to the frontend.

### Tech Stack

- **Backend**: [NestJS](https://nestjs.com)
- **Frontend**: [NextJS](https://nextjs.org)
- **Database**: [MongoDB](https://www.mongodb.com), managed with [Mongoose](https://mongoosejs.com)
- **Caching/Session Management**: [Redis](https://redis.io)
- **Authentication**: JWT, [Passport.js](http://www.passportjs.org)
- **Message Broker**: RabbitMQ for inter-service communication
- **Documentation**: Swagger setup for API documentation

## Monorepo Structure

Buddy leverages Turborepo to streamline dependency management and task execution across its microservices, ensuring efficient build and development workflows.

```
/auth             # User authentication microservice
/shelves          # Shelves microservice for educational resources
/spaces           # Study space locator microservice
/buddy            # Central service and entry point, includes admin dashboard
/client           # Frontend client application
```

## Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **MongoDB**: v5.x or higher
- **Redis**: v6.x or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Phastboy/buddy.git
   cd buddy
   ```

2. Install dependencies using Turborepo:

   ```bash
   npm install
   ```

### Running the Services

To start all services concurrently, use Turborepo:

```bash
npm run dev
```

### API Documentation

Access the Swagger-based API docs by navigating to the main service's URL at `http://localhost:<PORT>/`, where `<PORT>` is the port number defined in your environment (`3012` by default). For example, if no custom port is specified, visit:

```
http://localhost:3012/
```

### Contributing

1. Fork the project
2. Create a new feature branch: `git checkout -b feature/my-new-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push the branch: `git push origin feature/my-new-feature`
5. Open a pull request

### License

This project is licensed under the MIT License.
