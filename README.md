# Activity Manager 🗓️

Welcome to the Activity Manager app! This application allows you to effortlessly manage your daily tasks and activities. Built with React, Firebase, Next-Auth, and Next.js, this app offers a seamless user experience and robust functionality.

## Usage 


https://github.com/Omkar-Jawalkar/Next.js-to-do-app/assets/82781128/3bb02ce0-1645-4189-a83c-f04479eea210


## Features ✨

- **Create Tasks 📝**: Easily add new tasks with a description, due date, and priority level.
- **Update Tasks 🔄**: Modify existing tasks by editing their details or marking them as complete.
- **Delete Tasks ❌**: Remove tasks that are no longer relevant or have been completed.
- **Prioritize Tasks 🚀**: Arrange your tasks based on their priority level to stay focused on the most important activities.
- **Authentication 🔐**: Secure access to your tasks with Next-Auth integration, ensuring data privacy and personalization.
- **Real-time Updates 🔄**: Enjoy real-time synchronization of your tasks across devices, powered by Firebase.

## Getting Started 🚀

To get started with the Activity Manager app, follow these steps:

1. **Clone the Repository**
  ```bash
  git clone https://github.com/your-username/activity-manager.git
  ```

2. **Install Dependencies**
```bash
  cd activity-manager
  npm install
```
OR

  **Docker Commands**

> Before running docker, make sure to have a .env file with next-auth GOOGLE_ID and GOOGLE_SECRET configuration

```bash
cd activity-manager
docker build -t activity-manager .
docker run --env-file .env -p 3000:3000 activity-manager
```


3. **Configure Firebase**
  
   -  Create a new Firebase project and enable the Firestore Database and Authentication services.
   -  Copy the Firebase configuration details (API key, project ID, etc.) and paste them into           the `.env` file.

   
4. **Configure Next-Auth**
   
   - Follow the Next-Auth documentation to set up the authentication providers you want to use (e.g.,`Google`, `GitHub`, etc.).
   - Update the next-auth.config.js file with your provider configurations.
   
  
5. **Start the Development Server**
   ```bash
    npm run dev
   ```
   
6. **Open the App**  Visit http://localhost:3000 in your web browser to access the Activity Manager app.


## Contributing 👥

We welcome contributions from the community! If you'd like to contribute to the Activity Manager app, please go ahead!! 🤝

## Acknowledgements 🙏

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - A React framework for production
- [Firebase](https://firebase.google.com/) - A comprehensive app development platform
- [Next-Auth](https://next-auth.js.org/) - Authentication for Next.js

Feel free to explore the Activity Manager app and let us know if you have any questions or suggestions! Happy task managing! 🎉
   
