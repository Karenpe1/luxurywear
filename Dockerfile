# Use an official Node.js runtime as a build stage
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy  package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the application
RUN npm run build

# Use a lightweight web server to serve the production build
FROM nginx:alpine

# Set environment variables dynamically at runtime
ENV API_BASE_URL="http://localhost:8080"

# Copy the built application to the NGINX html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a startup script to inject environment variables dynamically
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose the container's port
EXPOSE 80

# Set the entrypoint to the startup script
CMD ["/start.sh"]
