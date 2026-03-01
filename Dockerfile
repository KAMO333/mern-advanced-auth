# Use Node 18 Alpine for a small, secure image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]