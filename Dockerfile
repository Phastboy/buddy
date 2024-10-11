# Use the official Node.js image as the base image
FROM node:lts-iron

LABEL org.opencontainers.image.source=https://github.com/Phastboy/buddy
LABEL org.opencontainers.image.description="Buddy is a comprehensive web application designed to enhance learning experiences."
LABEL org.opencontainers.image.description=MIT

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
