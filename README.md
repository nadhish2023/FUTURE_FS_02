# EchoPulse - A Cinematic Sci-Fi E-Commerce Experience

EchoPulse is a full-stack e-commerce platform designed to showcase premium audio products through an immersive, cinematic, and futuristic user interface. Built with a modern tech stack, it emphasizes a sleek dark theme, fluid animations, and a seamless user flow from browsing to checkout.

This project was developed as a comprehensive portfolio piece to demonstrate skills in frontend development with Next.js, backend API creation with serverless functions, database integration with MongoDB, and full-stack authentication.

![EchoPulse Hero Section](./public/astronaut.png)

## ✨ Features

-   **Immersive Sci-Fi UI**: A dark, cinematic theme that makes the user feel like they are in a futuristic space environment.
-   **Animated Hero Section**: A responsive, animated hero component that immediately engages the user with a floating astronaut.
-   **Product Catalog**: A fully responsive, grid-based product listing page that fetches product data.
-   **Dynamic Product Pages**: Unique, server-rendered pages for each individual product.
-   **Interactive Shopping Cart**: Built with Zustand for global state management, allowing users to add, remove, and update item quantities with real-time price calculations.
-   **Full-Stack User Authentication**: Secure user registration and login functionality using JWT for session management and `bcryptjs` for password hashing, connected to a MongoDB database.
-   **Checkout Simulation**: A validated form using React Hook Form to simulate the final steps of a purchase.
-   **Scroll Animations**: Subtle fade-up animations on product cards using the AOS library.

---

## 🛠️ Tech Stack

This project leverages a modern, powerful, and scalable tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (v14) with TypeScript
-   **Frontend**: [React.js](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) & [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Backend API**: Next.js API Routes (Serverless Functions)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for data modeling.
-   **Authentication**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)
-   A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Installation

1.  **Clone the repository**
    ```sh
    
    ```

2.  **Navigate to the project directory**
    ```sh
    cd echopulse
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Set up Environment Variables**
    -   Create a file named `.env.local` in the root of your project.
    -   Add your MongoDB Atlas connection string and a JWT secret to this file. Remember to replace `<password>` with your database user password and specify a database name (e.g., `echopulse`).

      ```env
      # MongoDB Connection String
      DATABASE_URL=mongodb+srv://your_username:<password>@your_cluster.mongodb.net/echopulse?retryWrites=true&w=majority

      # JWT Secret (generate a long, random string)
      JWT_SECRET=your_super_secret_jwt_key_that_is_long
      ```

5.  **Run the development server**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment

This application is configured for easy deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Go to your Vercel dashboard and import the project from GitHub.
3.  Vercel will automatically detect the Next.js framework.
4.  **Crucially, you must add your environment variables (`DATABASE_URL` and `JWT_SECRET`) in the Vercel project settings** under "Settings" > "Environment Variables".
5.  Click **Deploy**. Vercel will handle the rest.
