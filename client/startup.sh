envsubst < "/usr/share/nginx/html/config/runtime.json" > "/usr/share/nginx/html/config/runtime2.json"
nginx -g 'daemon off;'