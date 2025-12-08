# ---------------------------
# STAGE 1 — Build
# ---------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------------------------
# STAGE 2 — Serve with NGINX
# ---------------------------
FROM nginx:stable-alpine

# Copia build al directorio público de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración opcional (para SPA con Vue Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
