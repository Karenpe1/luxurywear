#!/bin/sh

# Replace the placeholder in the NGINX config with the actual API_BASE_URL value
sed -i "s|\$API_BASE_URL|${API_BASE_URL}|g" /etc/nginx/conf.d/default.conf

# Start NGINX
nginx -g "daemon off;"
