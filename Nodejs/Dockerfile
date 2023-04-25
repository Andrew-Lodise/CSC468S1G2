# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the app directory to the container
COPY app /app

# Set the port that the container will listen on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
