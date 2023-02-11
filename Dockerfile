# Use the official Node.js 10 image as the base
FROM node:18

# Create a working directory
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json /usr/src/app/

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . /usr/src/app

# Expose the application's port
EXPOSE 80

# Run the application
CMD [ "npm", "run" ]