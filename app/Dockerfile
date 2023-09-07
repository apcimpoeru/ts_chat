# Use the official Node.js image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Add node_modules/.bin to PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Build the Next.js application
RUN yarn build

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["yarn", "dev:server"]