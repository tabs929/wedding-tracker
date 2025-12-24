# 🚀 Deployment Guide

## Quick Start

### Option 1: Local Development

1. **Install dependencies:**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2. **Start servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

3. **Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

---

## Option 2: Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Create `.env` file in root:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-tracker
```

2. **Build and run:**
```bash
docker-compose up --build
```

3. **Access:**
- Application: http://localhost

---

## Option 3: Cloud Deployment

### Frontend on Vercel

1. **Prepare:**
```bash
cd frontend
```

2. **Update API URL in `src/services/api.ts`:**
```typescript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

3. **Deploy:**
```bash
npm install -g vercel
vercel
```

**Or via GitHub:**
- Push to GitHub
- Import in Vercel dashboard
- Set build settings:
  - Framework: Vite
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`

### Backend on Render

1. **Push to GitHub**

2. **Create Web Service on Render:**
- Connect GitHub repository
- Settings:
  - Name: `wedding-backend`
  - Root Directory: `backend`
  - Environment: `Node`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`

3. **Add Environment Variables:**
```
MONGODB_URI=your_connection_string
PORT=5001
NODE_ENV=production
```

4. **Deploy**

5. **Copy your Render URL and update frontend API URL**

### Backend on Railway

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Deploy:**
```bash
cd backend
railway login
railway init
railway up
```

3. **Add environment variables in Railway dashboard**

---

## Option 4: Netlify (Frontend) + Railway (Backend)

### Backend on Railway
```bash
cd backend
railway login
railway init
railway up
```

Add environment variables in dashboard.

### Frontend on Netlify

1. **Update API URL in code**

2. **Deploy:**
```bash
cd frontend
npm install -g netlify-cli
netlify deploy --prod
```

**Or via GitHub:**
- Push to GitHub
- Import in Netlify
- Build settings:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `dist`

---

## Production Checklist

### Before Deployment

- [ ] Update `API_BASE_URL` in `frontend/src/services/api.ts`
- [ ] Set `NODE_ENV=production` for backend
- [ ] Verify MongoDB Atlas allows connections from deployment platform
- [ ] Test production build locally:
  ```bash
  # Backend
  cd backend
  npm run build
  npm start
  
  # Frontend
  cd frontend
  npm run build
  npm run preview
  ```

### MongoDB Atlas Setup

1. **Network Access:**
   - Go to Network Access in Atlas
   - Add IP: `0.0.0.0/0` (Allow from anywhere)
   - Or add specific IPs of your deployment platform

2. **Database User:**
   - Ensure user has read/write permissions
   - Use strong password

### Security

- [ ] Never commit `.env` files
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Configure CORS for your production domain:

**Backend `src/server.ts`:**
```typescript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

---

## Troubleshooting

### CORS Issues
Update backend CORS configuration to allow your frontend domain.

### MongoDB Connection Fails
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure environment variable is set correctly

### Frontend Can't Connect to Backend
- Verify API_BASE_URL in frontend code
- Check backend URL is accessible
- Ensure CORS is properly configured

### Build Fails
```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-tracker
PORT=5001
NODE_ENV=production
```

### Frontend
Update directly in `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5001/api';
```

Then create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## Support

For issues, check:
1. Server logs
2. Browser console
3. Network tab in DevTools
4. MongoDB Atlas logs

**Good luck with your wedding! 💒**
