# specify the node base image with your desired version node:<version>
FROM node:8-alpine

# Copy package.json and yarn.lock then install app dependencies
COPY package*.json ./
COPY yarn.lock ./
# Install dependencies
RUN yarn install --production true

# Bundle app source
COPY . .

# Application's default port
EXPOSE 3000

# Launch application
CMD ["yarn","start"]

# Run as non-root user
USER node
