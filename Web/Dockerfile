# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source and public directory
COPY src ./src
COPY public ./public
COPY index.html .
COPY vite.config.js .

# Define build-time environment variables (these get embedded in the build)
ARG VITE_API_URL=http://localhost:3000
ARG VITE_WS_URL=ws://localhost:3000
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_WS_URL=${VITE_WS_URL}

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create env config script
RUN echo "#!/bin/sh\n\
envsubst '\$PORT \$API_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && \
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf && \
exec nginx -g 'daemon off;'" > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

# Define runtime environment variables
ENV PORT=80
ENV API_URL=http://localhost:3000

# Expose the port Railway will use
EXPOSE ${PORT}

# Start nginx with our entrypoint script
CMD ["/docker-entrypoint.sh"] 