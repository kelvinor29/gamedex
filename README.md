<p align="center">
  <img src="assets/logo/gamedex-transparent.png" alt="GameDex Logo" width="320" />
</p>

# 🎮 Welcome to GameDex ✌️

**GameDex** is a trivia game built with [**Expo**](https://expo.dev) and [**React Native**](https://reactnative.dev).  
On the **Home screen**, you'll find a list of games displayed as interactive cards. Each card shows the game’s name, image, rating, platforms, and more.
You can also play a guessing **game mode**, where you’ll try to identify the game shown on screen.

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on your preferred environment
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 📂 Project Structure
This project uses Expo Router for file-based routing
All screens and components are organized inside the app directory

## 🛠️ Tech Stack & Development Decisions
### [`API RAWG.IO`](https://rawg.io/).
I use the RAWG Video Games Database API to fetch game data (title, images, ratings, platforms, etc)

### [`Tanstack Query`](https://tanstack.com/query/latest).
Chosen to manage API requests efficiently
- Provides caching, retries, and background refetching
- Enables smooth pagination with useInfiniteQuery

### [`Zustand`](https://zustand-demo.pmnd.rs/).
Lightweight state management library
- Used to handle global app state like game sessions, theme (light/dark), and user preferences

### [`React Native Paper`](https://reactnativepaper.com/).
UI component library
- Provides consistent theming across light/dark mode.
- Used for buttons, inputs, cards, and typography.

## ✨ Features
- Browse a list of popular games.
- Trivia mode: guess the game based on image.
- Dynamic light/dark theme support.
- Smooth data fetching & caching with Tanstack Query.
