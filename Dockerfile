# Specify a base image
FROM node:alpine

#Install some dependencies

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
# Set up a default command
CMD [ "npm", "run","start" ]

