# 1. Use Node 18 Alpine for a small, secure image
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files first to cache the 'npm install' layer
COPY package*.json ./

# 4. Install production dependencies only
RUN npm install --omit=dev

# 5. Copy the rest of the application code
# This will include your 'backend' and 'frontend' folders
COPY . .

# 6. Expose the port (usually 5000 for your MERN backends)
EXPOSE 5000

# 7. Use the production start command from your package.json
# This sets NODE_ENV=production and runs backend/index.js
CMD ["npm", "start"]