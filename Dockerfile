FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

COPY startup.sh /startup.sh
RUN chmod +x /startup.sh
RUN npm run build