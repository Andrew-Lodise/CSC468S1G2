# Use Node.js v14 as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install react-scripts globally
RUN npm install -g react-scripts

# Copy the application files to the container
COPY app /app

# Copy the public files to the container
COPY public ./public

# Build the application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
