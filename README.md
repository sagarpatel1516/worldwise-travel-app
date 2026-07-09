![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge)

# 🌍 WorldWise - Travel Tracker

WorldWise is a modern travel tracking application that allows users to mark visited cities on an interactive map, save travel memories, browse visited countries, and organize their journeys through a clean and responsive interface.
### Built With

React • TypeScript • Vite • React Router • Leaflet • Context API • CSS Modules • JSON Server

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
- [☁️ Deployment](#️-deployment)
- [👤 Authentication](#-authentication)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🚀 Live Demo

👉 **[View Live Demo](https://worldwise-travel-app-u45h.vercel.app)**

---

## 📂 GitHub Repository

👉 **[View Source Code](https://github.com/sagarpatel1516/worldwise-travel-app)**

---

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Context API
- Custom Hooks
- React Leaflet
- Leaflet
- Geolocation API
- CSS Modules
- JSON Server

---

## ✨ Features

WorldWise enables travelers to organize and visualize the cities and countries they have visited on an interactive map.

- Interactive World Map
- Add Visited Cities
- Store Travel Notes
- View City Details
- Browse Visited Countries
- Geolocation Support
- Protected Routes
- Mock Authentication
- Responsive Design
- Dynamic Routing

---

## ⭐ Key Highlights

- Fully migrated from JavaScript to TypeScript
- Strongly typed React components and hooks
- Interactive maps powered by Leaflet
- Browser Geolocation API integration
- Context API for global state management
- Persistent city and country data using JSON Server
- Client-side routing with React Router
- Reusable component architecture
- Responsive user interface
- CSS Modules for scoped styling
- Clean and intuitive user experience

---

## 🏗️ Architecture

The application is built using modern React and TypeScript concepts including:

- TypeScript
- React 19
- Functional Components
- React Hooks
- Context API
- Custom Hooks
- React Router DOM
- Component-Based Architecture
- CSS Modules
- Geolocation API Integration

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

---

## 📷 Screenshots

Below are some screenshots showcasing the main features of the application.

### 🏠 Home Page

<img width="1298" height="582" alt="image" src="https://github.com/user-attachments/assets/09022126-9d59-4c84-8889-117c7ed1727b" />

### 💰 Pricing Page

<img width="1273" height="599" alt="image" src="https://github.com/user-attachments/assets/1244559c-3cac-4f6c-bc7f-3fb0e564da85" />

### 📖 Product Page

<img width="1254" height="612" alt="image" src="https://github.com/user-attachments/assets/81c47ac9-54ea-4613-bfb0-784a9659b16e" />

### 🗺️ Interactive Map

Users can select any location on the map to save it as a visited destination.

<img width="780" height="604" alt="image" src="https://github.com/user-attachments/assets/125751fc-9c5a-452c-8cf3-d68406b4ddde" />

### 🌎 Countries List

<img width="542" height="584" alt="image" src="https://github.com/user-attachments/assets/0adff6ef-7aba-4d1b-a61c-2719857a5775" />

### 🔐 Login Page

<img width="1285" height="585" alt="image" src="https://github.com/user-attachments/assets/afa0c684-3e50-44fb-b2e2-808564569eda" />

---

## 📁 Project Structure

```text
WorldWise/
├── src/
│   ├── components/
│   │   ├── AppNav.tsx
│   │   ├── BackButton.tsx
│   │   ├── Button.tsx
│   │   ├── City.tsx
│   │   ├── CityItem.tsx
│   │   ├── CityList.tsx
│   │   ├── CountryItem.tsx
│   │   ├── CountryList.tsx
│   │   ├── Form.tsx
│   │   ├── Logo.tsx
│   │   ├── Map.tsx
│   │   ├── Message.tsx
│   │   ├── PageNav.tsx
│   │   ├── SideBar.tsx
│   │   ├── Spinner.tsx
│   │   ├── SpinnerFullPage.tsx
│   │   └── User.tsx
│   │
│   ├── contexts/
│   │   ├── CitiesContext.tsx
│   │   └── fakeAuthContext.tsx
│   │
│   ├── hooks/
│   │   ├── useGeolocation.ts
│   │   └── useUrlPosition.ts
│   │
│   ├── pages/
│   │   ├── AppLayout.tsx
│   │   ├── Homepage.tsx
│   │   ├── Login.tsx
│   │   ├── Pricing.tsx
│   │   ├── Product.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PageNotFound.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── data/
│   └── cities.json
│
├── tsconfig.json
├── package.json
└── README.md
```


---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/sagarpatel1516/worldwise-travel-app.git
```

### Install dependencies

```bash
npm install
```

### Start the mock API

```bash
npm run server
```

### Start the development server

```bash
npm run dev
```

---

## ☁️ Deployment

The application is deployed on **Vercel**.

During development, **JSON Server** provides a mock REST API for storing visited cities and countries.

The project is built using **React 19**, **TypeScript**, and **Vite** for a fast and modern development experience.

---

## 👤 Authentication

- Fake Authentication
- Protected Routes
- User Session Context

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sagar Patel**  
Junior React & Next.js Developer

- 📧 Email: sagarpatel2524@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/sagar-patel-984ab6219
- 💻 GitHub: https://github.com/sagarpatel1516

---

⭐ If you found this project interesting, feel free to star the repository!
