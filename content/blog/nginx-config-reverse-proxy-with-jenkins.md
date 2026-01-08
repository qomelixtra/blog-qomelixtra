---
title: "Jenkins config reverse proxy with nginx"
description: "This is a blog, tell u how to config nginx reverse proxy with Jenkins on port 8081 and 5000"
date: "2026-01-06"
language: "en"
category: "Jenkins"
---

## How to Config Reverse Proxy, support websocket, file uplaod, and header

### 1. Use For UI : 8081

```bash
server {
    listen 80;
    server_name your-domain-name;

    # Allow upload up to 1GB
    client_max_body_size 1G;

    location / {
        proxy_pass http://127.0.0.1:8081;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;


        # Disable buffering (Important for WS + Streaming)
        proxy_buffering off;

        # Timeouts for large uploads / long WS connections
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```

### 2. Use For Registery : 5000

```bash
server {
    listen 80;
    server_name your-domain-name;

    # Allow upload up to 1GB
    client_max_body_size 1G;

    location / {
        proxy_pass http://127.0.0.1:5000;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;


        # Disable buffering (Important for WS + Streaming)
        proxy_buffering off;

        # Timeouts for large uploads / long WS connections
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```
