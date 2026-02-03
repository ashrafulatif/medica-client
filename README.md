# Medica - Online Medicine Store Frontend

### Your Trusted Online Pharmacy Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Authentication](#authentication)
- [Key Features by Role](#key-features-by-role)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

**Medica** is a modern, full-stack e-commerce web application designed for purchasing over-the-counter (OTC) medicines. The platform connects customers with verified sellers, providing a secure and convenient way to browse, order, and manage medicine purchases online.

This repository contains the **frontend client** built with Next.js 14+ (App Router), React 19, and TypeScript, featuring a responsive design, role-based dashboards, and seamless integration with the backend API.

---

## ✨ Features

### 🌐 Public Features

- ✅ Browse all available medicines
- ✅ Search and filter by category, price, and manufacturer
- ✅ View detailed medicine information (description, reviews, stock)
- ✅ Responsive design optimized for mobile and desktop
- ✅ Dark/Light theme support

### 👤 Customer Features

- ✅ User registration and authentication (Email + Google OAuth)
- ✅ Add medicines to cart
- ✅ Place orders with shipping address (Cash on Delivery)
- ✅ Track order status in real-time
- ✅ Leave reviews and ratings after purchase
- ✅ Manage user profile
- ✅ View order history and statistics

### 🏪 Seller Features

- ✅ Seller registration and login
- ✅ Add, edit, and remove medicine listings
- ✅ Manage inventory and stock levels
- ✅ View and manage incoming orders
- ✅ Update order fulfillment status
- ✅ View sales statistics and analytics
- ✅ Dashboard with sales insights

### 👨‍💼 Admin Features

- ✅ View all registered users (customers and sellers)
- ✅ Manage user status (ban/unban users)
- ✅ View all medicines and orders across the platform
- ✅ Create and manage medicine categories
- ✅ Platform-wide analytics dashboard
- ✅ Monitor total views, orders, and revenue
- ✅ Delete users and manage listings

---

## 🛠 Tech Stack

| Category             | Technologies                          |
| -------------------- | ------------------------------------- |
| **Framework**        | Next.js 16.1.6 (App Router)           |
| **Language**         | TypeScript 5.x                        |
| **UI Library**       | React 19.2.3                          |
| **Styling**          | TailwindCSS 4.x, tw-animate-css       |
| **UI Components**    | Radix UI, shadcn/ui                   |
| **Forms**            | @tanstack/react-form, react-hook-form |
| **Validation**       | Zod                                   |
| **Authentication**   | Better Auth 1.4.18                    |
| **State Management** | React Context API                     |
| **Carousel**         | Embla Carousel React                  |
| **Icons**            | Lucide React                          |
| **Notifications**    | Sonner (Toast)                        |
| **Environment**      | @t3-oss/env-nextjs                    |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git**

---

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ashrafulatif/medica-client.git
   cd medica-client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Backend API URLs
BACKEND_URL=https://your-backend-api.com
FRONTENDURL=http://localhost:3000
API_URL=https://your-backend-api.com/api
AUTH_URL=https://your-backend-api.com

# Client-side environment variables
NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL=http://localhost:3000
NEXT_PUBLIC_BACKEND_AUTH=https://your-backend-api.com
```

### Environment Variable Descriptions

| Variable                              | Description                           |
| ------------------------------------- | ------------------------------------- |
| `BACKEND_URL`                         | Base URL of your backend API          |
| `FRONTENDURL`                         | Frontend application URL              |
| `API_URL`                             | Backend API endpoint URL              |
| `AUTH_URL`                            | Authentication service URL            |
| `NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL` | Redirect URL after Google OAuth login |
| `NEXT_PUBLIC_BACKEND_AUTH`            | Public backend authentication URL     |

---

## 🎯 Running the Application

### Development Mode

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Linting

```bash
pnpm lint
```

---

## 📁 Project Structure

```
medica-client/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── actions/            # Server actions
│   │   ├── admin.action.ts
│   │   ├── auth.action.ts
│   │   └── ...
│   ├── app/                # Next.js App Router pages
│   │   ├── (commonLayout)/     # Public pages (home, shop, about)
│   │   ├── (customerLayout)/   # Customer-specific pages
│   │   ├── (dashboardLayout)/  # Admin & Seller dashboards
│   │   ├── (authLayout)/       # Login & Register pages
│   │   └── layout.tsx
│   ├── components/         # React components
│   │   ├── layout/            # Navbar, Footer, Sidebar
│   │   ├── modules/           # Feature-specific components
│   │   │   ├── homepage/
│   │   │   ├── authentication/
│   │   │   ├── admin/
│   │   │   └── ...
│   │   └── ui/                # shadcn/ui components
│   ├── context/            # React Context (AuthContext, CartContext)
│   ├── services/           # API service layers
│   │   ├── admin.service.ts
│   │   ├── medicine.service.ts
│   │   ├── order.service.ts
│   │   └── ...
│   ├── types/              # TypeScript type definitions
│   ├── lib/                # Utility functions
│   │   ├── auth-client.ts
│   │   └── utils.ts
│   ├── apiInstance.ts      # API endpoints configuration
│   ├── env.ts              # Environment variable validation
│   └── globals.css         # Global styles
├── .eslintrc.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 👥 User Roles

The application supports three distinct user roles:

| Role         | Access Level                       | Dashboard          |
| ------------ | ---------------------------------- | ------------------ |
| **Customer** | Browse, purchase, review medicines | Customer Dashboard |
| **Seller**   | Manage inventory, fulfill orders   | Seller Dashboard   |
| **Admin**    | Platform management, user control  | Admin Dashboard    |

---

## 🔑 Authentication

Medica uses **Better Auth** for secure authentication with the following methods:

- **Email/Password Authentication**: Traditional email-based registration and login
- **Google OAuth**: One-click login via Google
- **Session Management**: Secure session handling with HTTP-only cookies
- **Role-Based Access Control (RBAC)**: Different permissions for customers, sellers, and admins

### Authentication Flow

1. User registers with email/password or Google OAuth
2. Backend validates credentials and creates a session
3. Frontend stores session via cookies (HTTP-only)
4. Protected routes check authentication status
5. Role-based routing redirects users to appropriate dashboards

---

## 🎭 Key Features by Role

### Customer Dashboard

- **Order Statistics**: View total orders, pending deliveries, and completed purchases
- **Recent Orders**: Quick access to order history
- **Profile Management**: Update personal information
- **Cart Management**: Add/remove items, adjust quantities
- **Order Tracking**: Real-time order status updates
- **Reviews**: Rate and review purchased medicines

### Seller Dashboard

- **Sales Analytics**: Revenue tracking, order statistics
- **Inventory Management**: Add/edit/delete medicine listings
- **Order Fulfillment**: View and process customer orders
- **Stock Management**: Update stock levels
- **Medicine Status**: Mark medicines as active/inactive
- **Performance Metrics**: Track views and sales

### Admin Dashboard

- **Platform Statistics**: Total users, medicines, orders, and revenue
- **User Management**: View, ban, or delete users
- **Medicine Oversight**: Monitor all listings across sellers
- **Order Management**: View and manage all platform orders
- **Category Management**: Create and manage medicine categories
- **Platform Health**: Monitor system alerts and warnings

---

## 🔌 API Integration

The frontend communicates with the backend via RESTful APIs. All endpoints are defined in `src/apiInstance.ts`:

### API Endpoints Structure

```typescript
API_ENDPOINTS = {
  auth: {
    me: "/api/auth/me",
    getSession: "/get-session",
    updateProfile: "/api/auth/update",
  },
  medicines: {
    getAll: "/api/medicines",
    getFeaturedMedicine: "/api/medicines/isFeatured",
    getMedicineById: (id) => `/api/medicines/${id}`,
    createMedicine: "/api/seller/medicines",
  },
  orders: {
    getAllOrders: "/api/orders",
    getOrderById: (id) => `/api/orders/${id}`,
    createOrder: "/api/orders",
  },
  cart: {
    getCartItems: "/api/cart",
    addCartItems: "/api/cart/add",
    updateCartItem: (id) => `/api/cart/item/${id}`,
  },
  // ... and more
};
```

### Service Layer Architecture

Services handle all API communications:

- `medicine.service.ts` - Medicine CRUD operations
- `order.service.ts` - Order management
- `user.service.ts` - User profile operations
- `admin.service.ts` - Admin operations
- `cart.service.ts` - Shopping cart operations

---

## 🎨 UI Components

The project uses **shadcn/ui** components built on **Radix UI** primitives:

- **Forms**: Input, Select, Textarea, Checkbox, Radio
- **Navigation**: NavigationMenu, Sidebar, Breadcrumb
- **Feedback**: Toast (Sonner), Alert, Dialog, AlertDialog
- **Data Display**: Card, Table, Badge, Avatar
- **Overlays**: Sheet, DropdownMenu, Tooltip, ContextMenu
- **Layout**: Accordion, Tabs, Separator

All components are fully typed, accessible, and customizable via TailwindCSS.

---

## 🌙 Theme Support

Medica includes built-in dark/light theme support powered by `next-themes`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

Users can toggle themes via the `ModeToggle` component in the navigation bar.

---

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Mobile navigation uses a collapsible sheet menu for optimal UX on smaller screens.

---

## 🧪 Development Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Ashraful Atif**

- GitHub: [@ashrafulatif](https://github.com/ashrafulatif)

---

<div align="center">
  Made with ❤️ for healthcare accessibility
</div>
