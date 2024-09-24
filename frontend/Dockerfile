FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Nginx 스테이지
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
