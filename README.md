# Buddy

Buddy is an educational platform designed to streamline the learning process for students. It provides features such as user authentication, educational resource collections (Shelves), crowd-sourced study space recommendations with reviews, and an admin dashboard for content management. The backend is built using a microservices architecture with NestJS, MongoDB, Redis, and JWT for security and scalability.

## Features
- **User Authentication**: Secure local and OAuth login (Google, Facebook).
- **Shelves**: Collect and manage educational resources.
- **Crowd-sourced Study Space Locator**: Add, review, and search for study spaces in your area.
- **Admin Dashboard**: Manage users, resources, and study spaces.

## Architecture
Buddy follows a microservices architecture organized within a monorepo structure. Each service is isolated to improve maintainability and scalability. The services communicate via RESTful APIs and share a common authentication layer using JWT.

### Services
1. **Authentication Service**: Manages user registration, login, and JWT token issuance.
2. **Shelves Service**: Allows users to add and manage educational resources.
3. **Study Space Locator Service**: Facilitates adding, reviewing, and searching for study spaces.
4. **Buddy Service**: The main service that aggregates data from other services and provides a unified API. The admin dashboard is also part of this service.
### Tech Stack
- **Backend**: [NestJS](https://nestjs.com)
- **Database**: [MongoDB](https://www.mongodb.com)
- **ORM**: [Mongoose](https://mongoosejs.com)
- **Caching/Session Management**: [Redis](https://redis.io)
- **Authentication**: JWT, [Passport.js](http://www.passportjs.org)
- **Communication**: REST APIs

## Monorepo Structure

The project uses a monorepo structure for managing microservices:

```
/buddy
  /apps
    /auth
    /shelves
    /spaces
    /buddy (main service)
```

## Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: v5.x or higher
- **Redis**: v6.x or higher

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Phastboy/buddy.git
   cd buddy
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Services

1. **Authentication Service**:
   ```
   npm run start:dev auth
   ```
   
2. **Shelves Service**:
  ```
  npm run start:dev shelves
  ```

3. **Study Space Locator Service**:
```
  npm run start:dev spaces
   ```

   4. **Buddy (main service)**:
   ```
   npm run start:dev
   ```

### API Documentation

Each service will have its own API documentation, accessible via Swagger (if enabled). To access the API docs, navigate to the service’s base URL (e.g., `http://localhost:3000/api`).

### Contributing

1. Fork the project
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

### License

This project is licensed under the MIT License.
