# PantryGrove

## Overview

**PantryGrove** is a web application designed to simplify meal preparation by efficiently managing pantry inventory. The application allows users to track their pantry items, filter them by various categories, and keep their kitchen well-organized. PantryGrove is built with Next.js, Firebase for the backend, and Clerk for user authentication.

## Features

- **User Authentication**: Secure user authentication with Clerk, including sign-in, sign-up, and sign-out functionalities.
- **Pantry Management**: Users can add, update, and remove items from their pantry, with each item categorized and tracked by quantity.
- **Filtering**: Filter pantry items by category and quantity to easily manage and view specific items.
- **Search Functionality**: Search pantry items by name to quickly find what you need.
- **Desktop Design**: The app is optimized for desktop use.

## Tech Stack

- **Frontend**: Next.js, React, MUI (Material-UI) for styling.
- **Authentication**: Clerk for managing user authentication and sessions.
- **Backend**: Firebase Firestore for database management.
- **Deployment**: The app is deployed and hosted using Vercel.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pantrygrove.git
   cd pantrygrove
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

   NEXT_PUBLIC_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_APP_ID=your_firebase_app_id
   ```

   These environment variables are used to configure Firebase and Clerk.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Deployment

The application can be easily deployed using Vercel. Push your repository to GitHub and connect it to your Vercel account. Vercel will automatically deploy the app.

## App Structure

### `page.js` (Home Page)

- **Welcome Screen**: Users are greeted with a landing page that introduces them to the app.
- **Authentication Options**: Users can sign in or sign up using Clerk. After signing in, they can proceed to the dashboard.

### `dashboard/page.js` (Dashboard)

- **Pantry Management**: Users can view, add, update, and delete items in their pantry.
- **Filtering & Search**: Users can filter items by category and quantity, and search items by name.
- **Pagination**: The dashboard supports pagination for easier browsing of large inventories.

### `firebase.js`

- **Firebase Initialization**: Firebase is initialized using the configuration provided through environment variables. The Firestore database is set up for handling pantry data.

### `layout.js`

- **Clerk Provider**: The app is wrapped in the ClerkProvider to manage user authentication across the application.
- **Global Styles**: Includes global CSS for consistent styling.

## Known Issues

- **Mobile Responsiveness**: The app is currently not optimized for mobile devices. It is best viewed on a desktop or larger screen.
- **Sorting**: Sorting functionality is not yet implemented. The "Sort By" feature is a placeholder and will be available in a future update.

### Coming Soon

- **Sorting**: The ability to sort pantry items by name, category, and quantity is planned for a future release.
- **Mobile Responsiveness**: Future updates will focus on making the app fully responsive for mobile devices.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Clerk**: For providing seamless user authentication.
- **Firebase**: For the real-time database functionality.
- **Next.js**: For the robust React framework.
