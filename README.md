# 🛒 DemoStore - E-commerce Platform

A modern, _Full shopping cart and checkout experience_

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - User interface library
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend & Database

- **Firebase** - Backend-as-a-Service platform
  - **Firestore** - NoSQL document database
  - **Firebase Auth** - Authentication service
  - **Firebase Storage** - File storage

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Vercel** - Deployment platform (recommended)

### Key Libraries

- **React Context API** - State management
- **Firebase SDK v9** - Modular Firebase integration
- **Tailwind CSS Components** - Pre-built UI components

## 📁 Project Structurel-featured e-commerce platform built with Next.js, Firebase, and Tailwind CSS. This demo showcases a complete online shopping experience with admin management capabilities.

![DemoStore Hero](screenshots/hero-section.png)

## 🌟 Features

### 🛍️ Customer Features

- **Product Browsing**: View products with detailed information, images, and reviews
- **Advanced Search**: Search products by name, description, and category
- **Category Filtering**: Filter products by categories with dynamic counts
- **Shopping Cart**: Add, remove, and manage items with quantity controls
- **User Authentication**: Sign up, login, and profile management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Hero Carousel**: Featured products showcase on homepage
- **Price Display**: All prices shown in Indian Rupees (₹)

### 🔧 Admin Features

- **Product Management**: Add, edit, and delete products
- **Category Management**: Organize products by categories
- **Hero Carousel Control**: Add/remove products from homepage carousel
- **Analytics Dashboard**: View sales, orders, and product statistics
- **Order Management**: Track and update order statuses
- **Real-time Updates**: Live data synchronization with Firebase

### 💫 Technical Features

- **Server-Side Rendering**: Built with Next.js 15 for optimal performance
- **Real-time Database**: Firebase Firestore for live data updates
- **Authentication**: Firebase Auth with email/password
- **Image Optimization**: Next.js Image component for fast loading
- **Mobile-First Design**: Responsive UI with Tailwind CSS
- **State Management**: React Context for cart and auth state
- **Form Validation**: Client-side validation for all forms
- **Error Handling**: Comprehensive error handling and user feedback

## 📱 Screenshots

### Homepage & Features

![Demo Store Screenshot 1](screenshots/demoStore1.png)
_Modern e-commerce interface with featured products_

### Product Browsing & Management

![Demo Store Screenshot 2](screenshots/demoStore.png)
_Product listing and management capabilities_

### Complete Shopping Experience

![Demo Store Screenshot 3](screenshots/demoStore3.png)
_Full shopping cart and checkout experience_

## 🏗️ Project Structure

```
demo-store/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── *.svg                  # Icon files
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── admin/            # Admin dashboard pages
│   │   │   └── dashboard/    # Admin management interface
│   │   ├── auth/             # Authentication pages
│   │   ├── cart/             # Shopping cart page
│   │   ├── products/         # Product listing and details
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.js         # Root layout component
│   │   └── page.js           # Homepage
│   ├── components/           # Reusable React components
│   │   ├── Navigation.js     # Header navigation
│   │   ├── Footer.js         # Footer component
│   │   ├── HeroSection.js    # Homepage hero carousel
│   │   ├── ProductCard.js    # Product display card
│   │   ├── ProductModal.js   # Product quick view modal
│   │   ├── FeaturedProducts.js # Featured products section
│   │   ├── LoadingSpinner.js # Loading indicator
│   │   └── AdminRoute.js     # Admin route protection
│   ├── context/              # React Context providers
│   │   ├── AuthContext.js    # Authentication state
│   │   ├── CartContext.js    # Shopping cart state
│   │   └── AdminContext.js   # Admin state management
│   ├── lib/                  # Utility libraries
│   │   ├── firebase/         # Firebase configuration and services
│   │   │   ├── config.js     # Firebase config
│   │   │   ├── auth.js       # Authentication services
│   │   │   ├── products.js   # Product CRUD operations
│   │   │   ├── cart.js       # Cart management
│   │   │   ├── orders.js     # Order management
│   │   │   └── index.js      # Consolidated exports
│   │   ├── constants.js      # App configuration constants
│   │   ├── utils.js          # Utility functions
│   │   └── seedData.js       # Sample data for development
│   └── data/                 # Static data files
├── .env.local                # Environment variables (not in repo)
├── .env.example              # Environment variables template
├── firestore.rules           # Firestore security rules
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/demo-store.git
cd demo-store
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your Firebase configuration

#### Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Add your Firebase configuration to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

#### Set up Firestore Rules

Deploy the included Firestore rules:

```bash
firebase deploy --only firestore:rules
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Access Admin Panel

Navigate to `/admin` to access the admin dashboard. You can create an admin account through the authentication flow.

## 🎯 How It Works

### Customer Flow

1. **Browse Products**: Users can view all products or filter by categories
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Select products and add them to the shopping cart
4. **Authentication**: Create an account or login to manage orders
5. **Checkout**: Complete the purchase process (demo implementation)

### Admin Flow

1. **Login**: Access the admin panel with admin credentials
2. **Product Management**: Add new products with images, descriptions, and pricing
3. **Hero Carousel**: Select featured products for the homepage carousel
4. **Analytics**: View sales data, popular products, and customer metrics
5. **Order Management**: Track and update order statuses

### Technical Flow

1. **Frontend**: Next.js handles routing, SSR, and user interface
2. **Authentication**: Firebase Auth manages user sessions and security
3. **Database**: Firestore stores products, orders, and user data
4. **State Management**: React Context provides global state for cart and auth
5. **Real-time Updates**: Firebase listeners ensure data synchronization

## 🛠️ Technologies Used

### Frontend

- **Next.js 15**: React framework with App Router
- **React 18**: UI library with hooks and context
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library

### Backend & Database

- **Firebase Authentication**: User management and security
- **Firestore**: NoSQL database for real-time data
- **Firebase Analytics**: User behavior tracking

### Development Tools

- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **clsx**: Conditional className utility

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run seed         # Seed database with sample data (if implemented)
```

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- AWS Amplify
- Google Cloud Platform
- Railway

## 🔧 Configuration

### Environment Variables

All environment variables should be prefixed with `NEXT_PUBLIC_` for client-side access:

| Variable                                   | Description                  |
| ------------------------------------------ | ---------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key             |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID          |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID              |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`      | Firebase measurement ID      |

### Firebase Configuration

- **Authentication**: Email/Password provider enabled
- **Firestore**: Production mode with security rules
- **Storage**: Configured for product images (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@demostore.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Firebase Team** for the backend infrastructure
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Unsplash** for product placeholder images

---

**Built with ❤️ using Next.js and Firebase**

[Live Demo](https://your-demo-url.vercel.app) | [Documentation](https://github.com/your-username/demo-store/wiki) | [Issues](https://github.com/your-username/demo-store/issues)

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
