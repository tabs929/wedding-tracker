# Wedding Guest Tracker - Backend

REST API for managing wedding guest lists.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string

4. Run development server:
```bash
npm run dev
```

## Production

Build:
```bash
npm run build
```

Start:
```bash
npm start
```

## API Endpoints

- `GET /api/families` - Get all families
- `GET /api/families/:id` - Get family by ID
- `POST /api/families` - Create new family
- `PUT /api/families/:id` - Update family
- `DELETE /api/families/:id` - Delete family
- `GET /api/stats` - Get statistics
- `GET /health` - Health check
