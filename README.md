# Task_Tracker
A handyman task manager app I created in the Galaxies.Dev ZeroToHero course.

# Handyman Galaxies

Handyman Galaxies is a task management app built with [Expo](https://expo.dev) and React Native. It allows users to manage locations and tasks, with features like SQLite integration, notifications, and file-based routing.

## Features

- **Task Management**: Create, update, and delete tasks.
- **Location Management**: Add and manage locations.
- **SQLite Integration**: Local database for storing tasks and locations.
- **Notifications**: Get notified for urgent tasks.
- **Image Upload**: Attach images to tasks.
- **File-Based Routing**: Powered by [expo-router](https://expo.github.io/router/docs).

## Project Structure

```
.
├── app/                     # Main application directory
│   ├── _layout.tsx          # Root layout for the app
│   ├── index.tsx            # Redirect to the drawer layout
│   └── (drawer)/            # Drawer navigation
│       ├── _layout.tsx      # Drawer layout
│       ├── index.tsx        # Location management screen
│       └── location/        # Location-specific screens
│           ├── _layout.tsx  # Layout for location screens
│           ├── [id].tsx     # Tasks for a specific location
│           └── [id]/new-task.tsx # Create or update tasks
├── components/              # Reusable components
│   ├── LocationForm.tsx     # Form for adding locations
│   ├── LocationListItem.tsx # List item for locations
│   └── TaskListItem.tsx     # List item for tasks
├── utils/                   # Utility functions
│   └── db.ts                # SQLite database setup
├── types/                   # TypeScript interfaces
│   └── interfaces.ts        # Interfaces for tasks and locations
├── assets/                  # Static assets
│   ├── styles.tsx           # Global styles
│   └── images/              # Image assets
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/handyman-galaxies.git
   cd handyman-galaxies
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Open the app on your device using:
   - [Expo Go](https://expo.dev/client) for iOS/Android.
   - Web browser for web development.

## Scripts

- `npm start`: Start the development server.
- `npm run android`: Run the app on an Android emulator.
- `npm run ios`: Run the app on an iOS simulator.
- `npm run web`: Run the app in a web browser.
- `npm run reset-project`: Reset the project to a fresh state.

## Technologies Used

- **React Native**: Cross-platform mobile app development.
- **Expo**: Framework for building React Native apps.
- **SQLite**: Local database for storing data.
- **TypeScript**: Strongly typed JavaScript.
- **expo-router**: File-based routing for React Native.

## Features in Detail

### Task Management

- Add, update, and delete tasks.
- Mark tasks as urgent.
- Attach images to tasks using the device's image picker.

### Location Management

- Add and manage locations.
- View tasks associated with specific locations.

### Notifications

- Receive notifications for urgent tasks.
- Notifications are scheduled using `expo-notifications`.

### SQLite Integration

- Local database for offline-first functionality.
- Predefined tables for locations and tasks.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [SQLite](https://www.sqlite.org/)
- [expo-router](https://expo.github.io/router/docs)

## Screenshots

Add screenshots of your app here to showcase its features.

---

Feel free to customize this `README.md` to better suit your project!
