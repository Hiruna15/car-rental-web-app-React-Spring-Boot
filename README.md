# car-rental-web-app-React-Spring-Boot-

A comprehensive car rental application built with React, Spring Boot, and Firebase. This project demonstrates a full-stack solution for managing car rentals, including user authentication, vehicle management, and booking functionalities.

Technologies Used:
Front-end: React (Vite), MUI, Leaflet
Back-end: Spring Boot, MySQL
Firebase: Authentication, Storage, Firestore

Prerequisites:
Node.js (for React application)
JDK 21 (required for Spring Boot; older versions like 17 or 20 may work but are not guaranteed)
MySQL (for database)
Firebase (for authentication, storage, and Firestore)
MySQL Workbench (optional, for managing databases)

Setting Up the Project:

1. Set Up Firebase:

   1. Create a Firebase Project:

      - Go to the Firebase Console.
      - Create a new project or use an existing one.

   2. Add Firebase Configuration to Your Project:
      - In the Firebase Console, navigate to "Project Settings" and find your Firebase configuration.
      - Create a .env file in your React project root and add the Firebase configuration:
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
      - Ensure to replace the placeholders with your actual Firebase configuration values.
      - Install Firebase CLI (if needed):
        Run npm install -g firebase-tools to install Firebase CLI globally.

2. Set Up MySQL:

   - Install MySQL:
     Download and install MySQL from the MySQL website.
   - Create Databases:
     Open MySQL Workbench and execute the SQL scripts from Database_Schemas to create the required databases

3. Set Up the Spring Boot Microservices:

   - Clone the Microservices:
     Navigate to the Microservices folder.
   - Build and Run Microservices:
     Navigate to each microservice directory and run ./mvnw spring-boot:run
     (Ensure MySQL is running and accessible with the credentials provided in your application.properties.)
   - Configuration:
     Ensure each microservice's application.properties files are correctly configured with MySQL connection details.

4. Set Up the React Application:

   1. Clone the React Repository:
      Navigate to the car_renting_application folder.
   2. Install Dependencies:
      Run: npm install
   3. Run the React Application:
      Start the development server:
      Run: npm run dev
      (Ensure to run it on port 5173 as configured or adjust the port if needed in your vite.config.js.)

5. Handle Cross-Origin Issues:

   - For Spring Boot:
     By default, Spring Boot allows requests from http://localhost:5173. Ensure this matches your React development server's port or update it if needed.
   - For Firebase:
     If Firebase requests are blocked by cross-origin policies, consider using a tool like CORS Anywhere during development.

6. Additional Configuration:
   - Firebase Authentication, Storage, and Firestore:
     - Ensure Firebase authentication is correctly set up in the Firebase Console.
     - Configure Firebase Storage rules and Firestore rules as needed for your application.

Running the Project

1. Start MySQL: Ensure your MySQL server is running and accessible.
2. Run Spring Boot Microservices: Start all microservices.
3. Run React Application: Start the development server.
4. Access the Application: Open your browser and go to http://localhost:5173.
