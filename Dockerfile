# specify the node base image with your desired version node:<version>
FROM node:8

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN yarn install

# Application's default port
EXPOSE 3000

# Launch application
CMD ["yarn","start"]