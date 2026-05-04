# TinyTaskers

A kid-friendly job platform connecting young job seekers with local task opportunities like gardening, dog walking, cleaning, and babysitting.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)

## Overview

TinyTaskers is a full-stack web platform where job seekers can browse and apply for local tasks while job posters can create listings, manage applications, and track engagement. The platform includes a reward and rating system to encourage trusted community interactions.

## Features

- Role-based access for job seekers and job posters with JWT authentication
- Job listings with search, filters by category, location, and pay range
- Application submission and approval workflow
- Rating and review system for mutual feedback after task completion
- Reward points and achievement badges for completed milestones
- Multi-language support with react-i18next
- Progressive Web App with offline capability via service worker
- Bruno API documentation for all REST endpoints

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Redux, Material UI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT |
| PWA | Service Worker |
| i18n | react-i18next |
| API Docs | Bruno, OpenAPI |

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd api
npm install
```

Create a `.env` file in `/api`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3002
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

Backend runs at `http://localhost:3002`

### Frontend Setup

```bash
cd app
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

## License

MIT License
