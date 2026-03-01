# Raising Superstars - Coach Booking Project

A full-stack application for coach booking, featuring a Rails 8 backend and a React + Vite frontend.

## Getting Started

### Prerequisites

| Component | Language | Dependency Manager | Version |
|-----------|----------|-------------------|---------|
| **Backend** | Ruby | Bundle | v3.4.8+ |
| **Frontend** | Node.js | NPM | v20+ |

### Installation & Execution

#### 1. Backend (Rails)
```bash
cd backend
bundle install
bin/rails db:create db:migrate
bin/rails server
```
*API running at `http://localhost:3000`*

#### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*App running at `http://localhost:5173`*

---

## Folder Architecture

The project consists of two main folders:

```text
RaisingSuperstars/
├── backend/    # Rails 8 JSON API
│   ├── app/    # Core logic (Controllers, Models, Services)
│   ├── config/ # Environment and route settings
│   └── db/     # Database migrations
└── frontend/   # React + Vite Application
    ├── src/    # Source code
    │   ├── pages/    # Main views (BookingPage.jsx)
    │   ├── services/ # API client (Axios)
    │   └── lib/      # Styling utilities
    └── public/ # Static assets
```

## How it Works

1. **Zones**: Coaches are assigned to specific geographical zones.
2. **Availability**: The backend exposes time slots in 90-minute blocks (shared via `constants/slots.js`).
3. **Booking**: The frontend allows users to browse a 7-day tabbed view of available slots and book them using a seamless dark-themed interface.
