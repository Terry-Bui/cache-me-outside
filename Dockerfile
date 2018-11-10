# specify the node base image with your desired version node:<version>
FROM node:8-alpine


COPY package*.json ./
COPY yarn.lock ./
# Install dependencies
RUN yarn install --production true

COPY . .

# Application's default port
EXPOSE 3000

# Launch application
CMD ["yarn","start"]
