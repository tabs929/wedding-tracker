# 🚀 Quick Deployment Steps

## ✅ Git Repository Created!

Your code is now committed locally. Follow these steps to deploy:

---

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `wedding-guest-tracker`
   - Make it Public or Private
   - **Don't** initialize with README (already exists)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wedding-guest-tracker.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render

1. **Go to https://render.com and sign up/login**

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `wedding-guest-tracker`

3. **Configure:**
   - Name: `wedding-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: `Free`

4. **Add Environment Variables:**
   Click "Environment" and add:
   ```
   MONGODB_URI = mongodb+srv://tarunbagewadi99_db_user:3gsBRwWyQY3ku5KT@cluster0.ra1ishi.mongodb.net/wedding-tracker?retryWrites=true&w=majority&appName=Cluster0
   PORT = 5001
   NODE_ENV = production
   ```

5. **Click "Create Web Service"**

6. **Wait for deployment** (3-5 minutes)

7. **Copy your backend URL** (will be like: `https://wedding-backend-xxxx.onrender.com`)

---

## Step 3: Update Frontend API URL

1. **Edit `frontend/src/services/api.ts`:**
   
   Replace:
   ```typescript
   const API_BASE_URL = 'http://localhost:5001/api';
   ```
   
   With:
   ```typescript
   const API_BASE_URL = 'https://YOUR-RENDER-URL.onrender.com/api';
   ```

2. **Commit the change:**
   ```bash
   git add frontend/src/services/api.ts
   git commit -m "Update API URL for production"
   git push
   ```

---

## Step 4: Deploy Frontend to Vercel

1. **Go to https://vercel.com and sign up/login**

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select `wedding-guest-tracker`

3. **Configure:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Click "Deploy"**

5. **Wait for deployment** (1-2 minutes)

6. **Your app is live!** 🎉

---

## Step 5: Test Your Deployment

1. Open your Vercel URL (like: `https://wedding-guest-tracker.vercel.app`)

2. Test features:
   - ✅ View stats
   - ✅ Add a family
   - ✅ Edit family
   - ✅ Delete family
   - ✅ Search

---

## 🔧 Troubleshooting

### If backend fails to connect:
1. Check Render logs for errors
2. Verify MongoDB Atlas allows connections from anywhere (IP: `0.0.0.0/0`)
3. Check environment variables are set correctly

### If frontend can't reach backend:
1. Verify API_BASE_URL in `frontend/src/services/api.ts`
2. Check CORS is enabled in backend (already done)
3. Check backend is running on Render

### Free tier limitations:
- Render: Backend sleeps after 15 min inactivity (takes 30s to wake)
- Vercel: Unlimited bandwidth for hobby projects

---

## 🎯 Alternative: Deploy with Railway (Faster)

If you want a quicker option:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Get your Railway URL and update frontend
# Then deploy frontend to Vercel as above
```

---

## 📝 What You Have Now

- ✅ Git repository created
- ✅ Code committed
- ✅ Ready for GitHub push
- ✅ Deployment guides ready

**Next:** Push to GitHub and follow the steps above!

---

**Need help?** Check `DEPLOYMENT.md` for detailed guides.
