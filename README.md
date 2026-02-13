# 🎬 Movie Booking Backend API

> Production-ready RESTful API for movie ticket booking platform with JWT authentication, role-based access control, and microservices integration.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.2.1-blue.svg)](https://expressjs.com/)


  
**Notification Service:** [Repo Link](https://github.com/yourusername/notification-service)

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

---

## ✨ Features

### Core Functionality
- ✅ **User Authentication** - JWT-based signup/signin with bcrypt password hashing
- ✅ **Role-Based Access Control** - Admin, Client, and Customer roles with different permissions
- ✅ **Theatre Management** - Create, update, and manage theatres with owner-based access
- ✅ **Movie Management** - CRUD operations for movies with release status tracking
- ✅ **Show Scheduling** - Dynamic show creation with theatre-movie-timing combinations
- ✅ **Booking System** - Real-time seat availability with 5-minute payment timeout
- ✅ **Payment Processing** - Secure payment validation with booking status updates
- ✅ **Notification Integration** - Automated email notifications via microservice

### Advanced Features
- 🔒 Owner-based theatre management
- ⏱️ Automatic booking expiry (5-minute window)
- 📊 Admin analytics access
- 🔄 Real-time seat synchronization
- 🎫 Complete booking lifecycle management
- 🌐 Production/Development environment separation

---

## 🛠️ Tech Stack

**Backend Framework**
- Node.js 18.x
- Express.js 5.2.1

**Database**
- MongoDB Atlas (Cloud)
- Mongoose 9.x ODM

**Authentication & Security**
- JSON Web Tokens (JWT)
- bcrypt (password hashing)

**External Services**
- Axios (HTTP client)
- Notification Service (microservice)

**DevOps**
- dotenv (environment management)
- Nodemon (development)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Movie Booking Backend API                  │
│                   (Port 3000)                            │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Controllers  │  │  Middlewares │  │   Services   │  │
│  │              │  │              │  │              │  │
│  │ - Auth       │  │ - JWT Auth   │  │ - Business   │  │
│  │ - Users      │  │ - Validation │  │   Logic      │  │
│  │ - Movies     │  │ - RBAC       │  │ - DB Ops     │  │
│  │ - Theatres   │  │              │  │              │  │
│  │ - Shows      │  │              │  │              │  │
│  │ - Bookings   │  │              │  │              │  │
│  │ - Payments   │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Mongoose Models                      │   │
│  │  User | Theatre | Movie | Show | Booking | Payment│  │
│  └──────────────────────────────────────────────────┘   │
│                          │                               │
└──────────────────────────┼───────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  MongoDB Atlas  │
                  │   Cluster 1     │
                  │   (mba_db)      │
                  └─────────────────┘
                           
                           │ REST API
                           ▼
                  ┌─────────────────┐
                  │  Notification   │
                  │    Service      │
                  │  (Port 3001)    │
                  └─────────────────┘
```

---

## 📡 API Endpoints

### Authentication (Public)
```http
POST   /mba/api/v1/auth/signup      # Register new user
POST   /mba/api/v1/auth/signin      # Login and get JWT token
```

### Users (Protected)
```http
GET    /mba/api/v1/users            # Get all users (Admin only)
GET    /mba/api/v1/users/:id        # Get user by ID
PUT    /mba/api/v1/users/:id        # Update user (Self/Admin)
```

### Movies (Protected)
```http
POST   /mba/api/v1/movies           # Create movie (Admin)
GET    /mba/api/v1/movies           # Get all movies
GET    /mba/api/v1/movies/:id       # Get movie details
PUT    /mba/api/v1/movies/:id       # Update movie (Admin)
DELETE /mba/api/v1/movies/:id       # Delete movie (Admin)
```

### Theatres (Protected)
```http
POST   /mba/api/v1/theatre          # Create theatre (Admin/Client)
GET    /mba/api/v1/theatre          # Get all theatres (+ filters)
GET    /mba/api/v1/theatre/:id      # Get theatre details
PUT    /mba/api/v1/theatre/:id      # Update theatre (Owner/Admin)
DELETE /mba/api/v1/theatre/:id      # Delete theatre (Owner/Admin)
PATCH  /mba/api/v1/theatre/:id/movies  # Add/Remove movies
GET    /mba/api/v1/theatre/:id/movies  # Get theatre movies
```

**Query Filters:** `?city=Patna&pincode=800001&movieId=xyz`

### Shows (Protected)
```http
POST   /mba/api/v1/shows            # Create show (Admin/Client)
GET    /mba/api/v1/shows            # Get all shows (+ filters)
```

**Query Filters:** `?movieId=xyz&theatreId=abc`

### Bookings (Protected)
```http
POST   /mba/api/v1/bookings         # Create booking (5-min timeout starts)
GET    /mba/api/v1/bookings         # Get user bookings
GET    /mba/api/v1/bookings/:id     # Get booking details
PATCH  /mba/api/v1/bookings/:id     # Update booking status
DELETE /mba/api/v1/bookings/:id     # Cancel booking
```

### Payments (Protected)
```http
POST   /mba/api/v1/payments         # Process payment
GET    /mba/api/v1/payments         # Get payments (Admin: all, User: own)
GET    /mba/api/v1/payments/:id     # Get payment details
```

---

## 💾 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, bcrypt hashed),
  userId: String (required, unique),
  userRole: Enum ["ADMIN", "CLIENT", "CUSTOMER"] (default: "CUSTOMER"),
  userStatus: Enum ["APPROVED", "PENDING", "REJECTED"],
  timestamps: true
}
```

### Theatre Model
```javascript
{
  name: String (required),
  description: String (required),
  city: String (required),
  pincode: Number (required),
  address: String (required),
  owner: ObjectId → User (required),
  movies: [ObjectId → Movie],
  timestamps: true
}
```

### Movie Model
```javascript
{
  movieName: String (required, unique),
  description: String (required),
  director: String (required),
  cast: [String] (required),
  language: String (required),
  trailerUrl: String (required),
  releaseDate: Date (required),
  releaseStatus: Enum ["RELEASED", "UNRELEASED"],
  posterUrl: String (required),
  timestamps: true
}
```

### Show Model
```javascript
{
  movie: ObjectId → Movie (required),
  theatre: ObjectId → Theatre (required),
  timing: String (required, format: "HH:MM"),
  totalSeats: Number (required, min: 0),
  availableSeats: Number (required, min: 0),
  price: Number (required, min: 0),
  timestamps: true
}
```

### Booking Model
```javascript
{
  userId: ObjectId → User (required),
  showId: ObjectId → Show (required),
  timing: String (required),
  noOfSeats: Number (required, min: 0),
  totalCost: Number (required, min: 0),
  status: Enum ["CREATED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "EXPIRED"],
  timestamps: true
}
```

### Payment Model
```javascript
{
  booking: ObjectId → Booking (required),
  userId: ObjectId → User (required),
  amount: Number (required, min: 0),
  status: Enum ["SUCCESS", "FAILED", "PENDING"],
  timestamps: true
}
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Notification Service running (see [repo](link))

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/movie-booking-backend.git
cd movie-booking-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
PORT=####
NODE_ENV=development

# Database
DB_NAME=.....
DB_URL=.....
PROD_DB_URL=mongodb cluster url

# Authentication
AUTH_KEY=your-secret-key-

# External Services
NOTI_SERVICE=....
```

4. **Start the server**
```bash
npm start
# Server runs on http://localhost:####
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `####` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `DB_URL` | Development MongoDB URL | `mongodb+srv://...` |
| `PROD_DB_URL` | Production MongoDB URL | `mongodb+srv://...` |
| `AUTH_KEY` | JWT secret key | `your-256-bit-secret` |
| `NOTI_SERVICE` | Notification service URL | `http://localhost:####` |

---



## 🧪 Testing

 **Test Flow**
   ```
   Signup → Signin → Create Theatre → Create Movie → 
   Add Movie to Theatre → Create Show → Create Booking → Process Payment
   ```

### Sample API Calls

**Signup**
```bash
curl -X POST http://localhost:3000/mba/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "userId": "testuser01",
    "userRole": "CUSTOMER"
  }'
```

**Signin**
```bash
curl -X POST http://localhost:3000/mba/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testuser01",
    "password": "password123"
  }'
```

**Create Booking** (with JWT token)
```bash
curl -X POST http://localhost:3000/mba/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "x-access-token: YOUR_JWT_TOKEN" \
  -d '{
    "showId": "SHOW_ID",
    "timing": "18:00",
    "noOfSeats": 2
  }'
```

---

## 📁 Project Structure

```
movie-booking-backend/
├── controllers/           # Request handlers
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── movie.controller.js
│   ├── theatre.controllers.js
│   ├── show.controller.js
│   ├── booking.controller.js
│   └── payment.controller.js
│
├── middlewares/           # Auth & validation
│   ├── auth.middlewares.js
│   ├── user.middlewares.js
│   ├── movie.middlewares.js
│   ├── theatre.middlewares.js
│   ├── show.middlewares.js
│   ├── booking.middlewares.js
│   └── payment.middlewares.js
│
├── models/               # Mongoose schemas
│   ├── user.model.js
│   ├── theatre.model.js
│   ├── movie.model.js
│   ├── show.model.js
│   ├── booking.model.js
│   └── payment.model.js
│
├── routes/               # API routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── movie.routes.js
│   ├── theatre.routes.js
│   ├── show.routes.js
│   ├── booking.routes.js
│   └── payment.routes.js
│
├── services/             # Business logic
│   ├── user.service.js
│   ├── movie.service.js
│   ├── theatre.service.js
│   ├── show.service.js
│   ├── booking.service.js
│   ├── payment.service.js
│   └── email.service.js
│
├── utils/                # Helpers
│   ├── constants.js
│   └── responsebody.js
│
├── .env                  # Environment variables
├── .gitignore
├── index.js              # Main server file
├── package.json
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🔗 Related Projects

- [Notification Service](https://github.com/gulshanthakur17/NotificationService) - Email notification microservice


---

**Built with ❤️ using Node.js, Express, and MongoDB**
