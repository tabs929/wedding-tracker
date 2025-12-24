# 💒 Wedding Guest Tracker

A full-stack wedding guest management application built with React, TypeScript, Express, and MongoDB.

## 🚀 Features

- **Dashboard Statistics**: Real-time overview of total families, guests, gender breakdown, and attendance
- **Family Management**: Add, edit, and delete family groups
- **Member Tracking**: Track individual guests with name, gender, and attendance status
- **Search & Filter**: Quickly find families or members
- **Responsive Design**: Beautiful UI with Tailwind CSS that works on all devices
- **REST API**: Fully functional backend API with TypeScript

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **MongoDB Atlas** for cloud database
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
cd "/Users/tarunbagewadi/Documents/My Documents/Marriage UI/wedding-guest-tracker"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

The `.env` file is already configured with your MongoDB Atlas connection.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: **http://localhost:5001**

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/families` | Get all families |
| GET | `/api/families/:id` | Get family by ID |
| POST | `/api/families` | Create new family |
| PUT | `/api/families/:id` | Update family |
| DELETE | `/api/families/:id` | Delete family |
| GET | `/api/stats` | Get statistics |
| GET | `/health` | Health check |

## 📦 Project Structure

```
wedding-guest-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── familyController.ts
│   │   ├── models/
│   │   │   └── Family.ts
│   │   ├── routes/
│   │   │   └── families.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FamilyFormModal.tsx
    │   │   ├── FamilyTable.tsx
    │   │   └── StatsCard.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── tailwind.config.js
```

## 🎨 Features in Detail

### Stats Dashboard
- Total Families count
- Total Guests (Men + Women)
- Gender breakdown
- Attendance tracking

### Family Table
- Displays all families with member details
- Color-coded attendance indicators
- Inline member list with gender markers
- Quick edit and delete actions

### Family Form
- Add/Edit family name
- Dynamically add/remove members
- Set member name, gender, and attendance
- Form validation

### Search
- Filter families by family name
- Search by member names
- Real-time filtering

## 🔒 Environment Variables

Backend `.env`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
```

## 🚀 Deployment

### Quick Setup (Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:80
- Backend on http://localhost:5001

**Important:** Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
```

### Individual Docker Builds

**Backend:**
```bash
cd backend
docker build -t wedding-backend .
docker run -p 5001:5001 -e MONGODB_URI=your_connection_string wedding-backend
```

**Frontend:**
```bash
cd frontend
docker build -t wedding-frontend .
docker run -p 80:80 wedding-frontend
```

## 🌐 Deployment Platforms

### Vercel (Frontend)
1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Update API URL in `frontend/src/services/api.ts` to your backend URL
5. Deploy

### Render/Railway (Backend)
1. Push code to GitHub
2. Create new Web Service
3. Set root directory to `backend`
4. Add environment variable: `MONGODB_URI`
5. Build command: `npm install && npm run build`
6. Start command: `npm start`

### Netlify (Frontend)
1. Push code to GitHub
2. Import repository
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Update API URL in code before deploying

## 📝 Pre-Deployment Checklist

- [ ] Update API URL in `frontend/src/services/api.ts` for production
- [ ] Set `NODE_ENV=production` for backend
- [ ] Verify MongoDB Atlas network access allows your deployment platform
- [ ] Add MongoDB connection string to environment variables
- [ ] Test production build locally
- [ ] Configure CORS for your production domain in backend if needed

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Keep MongoDB credentials secure
- Enable MongoDB Atlas IP whitelisting in production
- Use HTTPS in production

## 📝 License

ISC

## 👨‍💻 Author

Tarun Bagewadi

---

**Happy Wedding Planning! 💍**
