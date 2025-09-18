# Use Node.js LTS as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Copy the production environment file
COPY .env.production .env

# Build the Nuxt app
RUN npm run build

# Expose the port Nuxt uses
EXPOSE 3000

# Start the Nuxt app in production
CMD ["npm", "run", "start"]
