# Set base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire application code
COPY . .

# Build the ReactJS application
RUN npm run build

# Set the startup command
CMD ["npm", "run", "start"]
