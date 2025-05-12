# Use Node.js as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .

# Build the app with environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the app
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose the port
EXPOSE ${PORT:-80}

# Start the app
CMD serve -s dist -l ${PORT:-80} 