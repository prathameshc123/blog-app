# 🚀 BlogGlow Deployment Guide (AWS EC2)

Follow these steps to deploy your full-stack blog application to AWS.

## 1. AWS EC2 Setup
- **Launch Instance**: Choose **Ubuntu 22.04 LTS**.
- **Instance Type**: `t2.micro` (Free Tier) or `t3.micro`.
- **Security Groups**: Allow:
  - SSH (Port 22) - *Restricted to your IP*
  - HTTP (Port 80) - *0.0.0.0/0*
  - HTTPS (Port 443) - *0.0.0.0/0*

## 2. Server Configuration (Inside SSH)

### Install Node.js (via NVM)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 20
```

### Setup Project
1. Clone your repository.
2. `cd server && npm install`
3. `cd ../client && npm install && npm run build`
4. Create `.env` in the `server` folder with your `MONGO_URI` and `JWT_SECRET`.

### Process Management (PM2)
```bash
sudo npm install -g pm2
cd server
pm2 start server.js --name "blog-api"
pm2 save
pm2 startup
```

## 3. Nginx Reverse Proxy
Install Nginx:
```bash
sudo apt update
sudo apt install nginx
```

Edit the config:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace contents with:
```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    # Frontend (Static Files)
    location / {
        root /home/ubuntu/blog-app/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API (Proxy)
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Test and Restart:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 4. SSL (Optional but Recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
