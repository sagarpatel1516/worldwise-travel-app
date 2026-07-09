![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

# 🌍 WorldWise - Travel Tracker

WorldWise is a modern travel tracking application that allows users to mark visited cities on an interactive map, save travel memories, explore visited countries, and manage their travel history with a clean and responsive interface.

The application uses **Firebase Firestore** as a real-time database to store city information and provides a smooth user experience with modern React and TypeScript practices.

### Built With

React • TypeScript • Vite • React Router • Firebase Firestore • Leaflet • Context API • CSS Modules

---

## 📑 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [📂 GitHub Repository](#-github-repository)
- [🛠️ Tech Stack](#️-tech-stack)
- [✨ Features](#-features)
- [⭐ Key Highlights](#-key-highlights)
- [📱 Responsive Design](#-responsive-design)
- [📷 Screenshots](#-screenshots)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔥 Firebase Setup](#-firebase-setup)
- [☁️ Deployment](#️-deployment)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🚀 Live Demo

👉 **[View Live Demo](https://worldwise-travel-app-u45h.vercel.app)**

---

## 📂 GitHub Repository

👉 **[View Source Code](https://github.com/sagarpatel1516/worldwise-travel-app)**

---

# 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- Custom Hooks
- CSS Modules

### Backend / Database

- Firebase Firestore
- Firebase Authentication

### Maps

- Leaflet
- React Leaflet
- Browser Geolocation API

### Deployment

- Vercel

---

# ✨ Features

WorldWise helps travelers organize and visualize their visited places using an interactive world map.

### 🌎 Travel Management

- Interactive world map
- Add visited cities
- Save travel dates
- Store travel notes
- View city details
- Browse visited countries
- Delete saved cities

### 🗺️ Map Features

- Interactive Leaflet map
- Click anywhere to select locations
- Automatic latitude and longitude detection
- Browser geolocation support

### 🔥 Firebase Features

- Firebase Firestore database integration
- Real-time city data storage
- Persistent travel data
- Secure cloud data management

### 🔐 Application Features

- Protected routes
- User authentication
- Global state management
- Responsive design
- Dynamic routing

---

# ⭐ Key Highlights

- Built using React + TypeScript
- Firebase Firestore integration
- Real-time cloud database
- Context API state management
- Reusable component architecture
- Custom React hooks
- React Router navigation
- Leaflet map integration
- Type-safe development
- Responsive UI using CSS Modules

---

# 🏗️ Architecture

The application follows modern React development practices:

- Functional Components
- React Hooks
- TypeScript Interfaces
- Context API
- Custom Hooks
- Component-Based Architecture
- Firebase Firestore Services
- Protected Routing
- Modular CSS Styling

---

# 📱 Responsive Design

The application is optimized for:

- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

---

# 📷 Screenshots

Below are screenshots showcasing the main features of the application.

### 🏠 Home Page

<img width="1298" height="582" alt="image" src="https://github.com/user-attachments/assets/09022126-9d59-4c84-8889-117c7ed1727b" />

### 🗺️ Interactive Map

<img width="780" height="604" alt="image" src="https://github.com/user-attachments/assets/125751fc-9c5a-452c-8cf3-d68406b4ddde" />

### 🌎 Countries List

<img width="542" height="584" alt="image" src="https://github.com/user-attachments/assets/0adff6ef-7aba-4d1b-a61c-2719857a5775" />

---

# 📁 Project Structure

```text
WorldWise/
│
├── src/
│   ├── components/
│   │   ├── CityItem.tsx
│   │   ├── CityList.tsx
│   │   ├── CountryItem.tsx
│   │   ├── CountryList.tsx
│   │   ├── Map.tsx
│   │   ├── Form.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   │
│   ├── contexts/
│   │   └── CitiesContext.tsx
│   │
│   ├── hooks/
│   │   ├── useGeolocation.ts
│   │   └── useUrlPosition.ts
│   │
│   ├── firebase/
│   │   └── firebase.ts
│   │
│   ├── pages/
│   │   ├── Homepage.tsx
│   │   ├── Login.tsx
│   │   ├── Pricing.tsx
│   │   └── Product.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/sagarpatel1516/worldwise-travel-app.git
```

## Install dependencies

```bash
npm install
```

## Create environment variables

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Start development server

```bash
npm run dev
```

---

# 🔥 Firebase Setup

1. Create a project in Firebase Console.
2. Enable Firestore Database.
3. Enable Firebase Authentication.
4. Add a Web App.
5. Copy Firebase configuration values.
6. Add them to your `.env` file.
7. Run the application.

---

# ☁️ Deployment

The application is deployed using **Vercel**.

Environment variables must be added inside Vercel project settings for Firebase configuration.

---

# 🔐 Authentication

- Firebase Authentication
- Protected Routes
- User Session Management

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Sagar Patel**
Junior React & Next.js Developer

- 📧 Email: [sagarpatel2524@gmail.com](mailto:sagarpatel2524@gmail.com)
- 💼 LinkedIn: https://www.linkedin.com/in/sagar-patel-984ab6219
- 💻 GitHub: https://github.com/sagarpatel1516

---

⭐ If you found this project useful, feel free to star the repository!
