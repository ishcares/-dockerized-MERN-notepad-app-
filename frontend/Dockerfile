# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder

# 1. Define the Build Arguments
ARG VITE_BACKEND_URL
ARG CACHEBUST

# 2. Set Working Directory (inside the container)
WORKDIR /app/notesapp

# 3. Install Dependencies
COPY notesapp/package*.json ./
RUN npm install

# 4. Copy Source Code (✅ FIXED PATH)
COPY notesapp/ .

# 5. Set Environment Variable
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# 6. Run the Build
RUN npm run build

# --- Stage 2: Serve the Static Assets with Nginx ---
FROM nginx:alpine

# 7. Copy Nginx Config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Copy Built Files
COPY --from=builder /app/notesapp/dist /usr/share/nginx/html

# 9. Expose Port and Run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
