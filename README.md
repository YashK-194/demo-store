# DemoStore - Modern E-commerce Platform

A modern, responsive e-commerce platform built with Next.js, featuring a clean design and smooth user experience.

## Features

### 🏪 Core Functionality

- **Homepage**: Hero section with featured products
- **Product Catalog**: Browse all products with filtering and sorting
- **Product Details**: Modal view with detailed product information
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login/signup interface (Firebase integration ready)
- **Contact/About**: Combined page with contact form and company information

### 🎨 Design & UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist design with smooth animations
- **Fast Loading**: Optimized images and efficient component structure
- **Accessible**: Built with accessibility best practices

### 🛍️ Product Categories

- Electronics (📱)
- Clothing (👕)
- Stationary (📝)
- Toys (🧸)
- Power Tools (🔧)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About/Contact page
│   ├── auth/              # Login/Signup page
│   ├── cart/              # Shopping cart page
│   ├── products/          # Products listing page
│   └── page.js            # Homepage
├── components/            # Reusable components
├── context/               # React Context providers
├── data/                  # Mock data and utilities
└── lib/                   # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Future Integrations

The application is structured to easily integrate Firebase and Stripe for authentication and payments.
