# 1. Use Bullseye to get the right legacy library support
FROM node:18-bullseye-slim

# 2. Install the exact libraries MongoDB 4.4 needs
RUN apt-get update && apt-get install -y \
    libcurl4 \
    libssl1.1 \
    liblzma5 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

# 3. Use 'npm install' to include devDependencies for Jest
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]