# Raising Superstars - Coach Booking Frontend

A modern React application for booking coaches based on geographical zones, built with Vite and Tailwind CSS.

## Prerequisites

- **Node.js**: v20 or higher
- **NPM**: v10 or higher
- **Backend API**: Should be running at `http://localhost:3000`

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

---

## Folder Architecture

```text
src/
├── components/   # Reusable UI elements (Button, Card, etc.)
├── constants/    # Static data like shared time slots
├── lib/          # Utilities and styling helpers (cn function)
├── pages/        # Main application screens (BookingPage.jsx)
├── services/     # API logic and Axios client (api.js)
├── App.jsx       # Root component and global providers
└── main.jsx      # Entry point for React
```

## How it Works

1. **Zone Selection**: Choose a zone to trigger the availability search.
2. **Availability Tabs**: Browse a 7-day horizontal view of available spots.
3. **Seamless Booking**: Select a slot to book instantly. Error and success messages are displayed via global toast notifications.

## Technologies

- **React + Vite**
- **Tailwind CSS**
- **Axios** (API Client)
- **Sonner** (Toast Notifications)
