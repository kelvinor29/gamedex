<p align="center">
  <img src="assets/logo/gamedex-transparent.jpeg" alt="GameDex Logo" width="320" />
</p>

# 🎮 Welcome

> A modern React Native gaming companion app featuring real-time game discovery and interactive trivia gameplay. Built to explore and master contemporary mobile development patterns and UI/UX best practices.

---


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Decisions](#architecture--decisions)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Key Learning Outcomes](#key-learning-outcomes)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**GameDex** is a React Native application that demonstrates modern mobile development practices through two core experiences:

1. **Game Browser**: Browse thousands of games from the RAWG Video Games Database with infinite scroll pagination
2. **Trivia Game**: Test your gaming knowledge with an interactive guessing game featuring lives-based mechanics

This project showcases how to build performant, maintainable mobile applications with proper state management, efficient API handling, and delightful user experiences across light and dark themes.

**Target Audience**: Gaming enthusiasts and developers who want to explore game metadata  
**Learning Focus**: React Native ecosystem, async data management, mobile UI/UX patterns

---

## ✨ Features

### Game Discovery
- 🎯 **Infinite Scroll Pagination**: Seamlessly browse thousands of games without performance degradation
- 🔍 **Search Integration**: Find games by title with real-time results
- ⭐ **Rich Game Details**: Display ratings, platforms (Windows, PlayStation, Xbox, Mac, Nintendo), release dates, and metadata
- 🎨 **Beautiful Cards**: Responsive layouts

### Trivia Game Mode
- 🧠 **Intelligence Quiz**: Guess the game based on cover image and multiple-choice options
- ❤️ **Lives System**: 5 attempts per game session with visual feedback
- 📊 **Score Tracking**: Real-time tracking of correct/incorrect answers
- 🎮 **Game Over Flow**: Review performance and replay with fresh questions
- 🔄 **Difficulty Progression**: Questions randomized from full RAWG database

### Theme & UX
- 🌓 **Dynamic Light/Dark Mode**: Seamless theme switching with persistent user preference
- 📱 **Responsive Design**: Optimized layouts for various screen sizes
- ⚡ **Smooth Animations**: Polished transitions between screens and states
- ♿ **Accessibility Focused**: WCAG compliance considerations throughout

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React Native + Expo | Cross-platform mobile development |
| **Routing** | Expo Router | File-based navigation (similar to Next.js) |
| **State Management** | Zustand | Lightweight, TypeScript-friendly global state |
| **API Integration** | TanStack Query (React Query) | Data fetching, caching, pagination |
| **UI Components** | React Native Paper | Consistent Material Design components |
| **API Source** | RAWG Video Games Database | 800K+ games metadata |
| **Build Tool** | Expo CLI | Streamlined development & deployment |

---

## 🏗️ Architecture & Decisions

### 1. **TanStack Query for Data Management**

```typescript
export const useInfiniteGames = (searchQuery: string) => {
    return useInfiniteQuery({
        queryKey: ["games", searchQuery],
        queryFn: ({ pageParam }) => fetchGames(pageParam || `/games?search=${searchQuery}`),
        initialPageParam: `/games?search=${searchQuery}`,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        retry: 2,
        staleTime: 1000 * 60 * 5, 
    });
};
```

**Why TanStack Query?**
- ✅ Automatic caching prevents redundant API calls
- ✅ Built-in retry logic handles network failures gracefully
- ✅ `useInfiniteQuery` perfectly suited for pagination
- ✅ Reduces component boilerplate significantly
- ✅ Industry standard across React ecosystem

**Why Zustand over Redux/MobX?**
- Minimal boilerplate (vs Redux)
- No provider wrapper needed
- Excellent TypeScript support
- Persistent state with middleware
- Small bundle impact (~2KB gzipped)

### 3. **React Native Paper for Theming**

Provides pre-built Material Design components with built-in theme support, ensuring consistency across light/dark modes without custom styling overhead.

### 4. **Expo Router for Navigation**

File-based routing mirrors Next.js patterns developers know, reducing navigation configuration complexity while maintaining type safety.

### 5. **RAWG.IO API Selection**

Chosen for:
- 📈 800,000+ games database
- 🔄 Reliable uptime and response times
- 📊 Rich metadata (ratings, platforms, images, release dates)
- 🆓 Generous free tier

---

## 📸 Screenshots

### Game Browser & Trivia Experience

| Home Screen | Game Details | Trivia Mode | Game Over |
|-------------|-------------|-------------|-----------|
| ![Game List](https://github.com/kelvinor29/gamedex/assets/screen-game-list.jpeg) | ![Trivia](https://github.com/kelvinor29/gamedex/assets/screen-game-dark-theme.jpeg) | ![Result](https://github.com/kelvinor29/gamedex/assets/screen-game-lost.jpeg) |

### Theme Support

| Light Mode | Dark Mode |
|-----------|-----------|
| ![Light](https://github.com/kelvinor29/gamedex/assets/screen-game-light-theme.jpeg) | ![Dark](https://github.com/kelvinor29/gamedex/assets/screen-game-dark-theme.jpeg) |

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 16+ 
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`

### Quick Start

```bash
# Clone the repository
git clone https://github.com/kelvinor29/gamedex.git
cd gamedex

# Install dependencies
npm install

# Start development server
npx expo start
```

### Running the App

Choose your preferred environment:

**Option 1: Expo Go (Fastest)**
```bash
npx expo start
# Scan QR code with Expo Go app (iOS/Android)
```

**Option 2: Android Emulator**
```bash
npx expo start
# Press 'a' to open Android Emulator
```

**Option 3: iOS Simulator (macOS only)**
```bash
npx expo start
# Press 'i' to open iOS Simulator
```

**Option 4: Development Build**
```bash
eas build --platform android
# Or for iOS
eas build --platform ios
```

### Environment Setup

Create a `.env` file in the root directory:

```env
RAWG_API_KEY=your_api_key_here
```

Get your free API key at [rawg.io/api](https://rawg.io/api)

---

## 📂 Project Structure


```
gamedex/
├── app/                         # Expo Router navigation (file-based routing)
├── assets/
│   ├── images/                  # App images and illustrations
│   └── logo/                    # Logo assets
├── components/
│   ├── form/                    # Form-related components
│   ├── nav/
│   │   ├── AppDrawer.tsx        # Side drawer navigation
│   │   └── AppTabNav.tsx        # Bottom tab navigation
│   └── ui/                      # Reusable UI components
├── context/
│   └── AuthContext.tsx          # Authentication context provider
├── hooks/
│   ├── useDebounce.ts           # Debounce hook for search
│   ├── useGameLogic.ts          # Trivia game logic
│   ├── useInfiniteGames.ts      # Infinite scroll pagination
│   └── usePopularGames.ts       # Popular games fetching
├── interfaces/
│   ├── api-rawg-response.interface.ts    # RAWG API response types
│   └── IGame.ts                 # Game entity interface
├── services/
│   └── rawg.service.ts          # RAWG API client & requests
├── store/                       # Zustand global state
│   └── (state management files)
├── theme/
│   ├── colors.ts                # Color definitions for light/dark mode
│   ├── fonts.ts                 # Typography/font configurations
│   └── paperTheme.ts            # React Native Paper theme setup
├── app.json                     # Expo configuration
├── tsconfig.json                # TypeScript configuration
├── eas.json                     # EAS Build configuration
├── .env                         # Environment variables (add to .gitignore)
└── package.json                 # Project dependencies
```


### 📋 Architecture Breakdown

**`app/`** - Expo Router pages and layouts
- File-based routing structure
- Screen components and navigation flows

**`components/`** - Reusable UI components
- `form/` - Form inputs and validation components
- `nav/` - Navigation components (drawer, tabs)
- `ui/` - Shared UI elements (buttons, cards, etc)

**`context/`** - React Context API providers
- `AuthContext.tsx` - User authentication state management

**`hooks/`** - Custom React hooks
- `useDebounce.ts` - Debounce for search input optimization
- `useGameLogic.ts` - Trivia game state and game over logic
- `useInfiniteGames.ts` - Infinite scroll with TanStack Query
- `usePopularGames.ts` - Fetch popular games on startup

**`interfaces/`** - TypeScript type definitions
- API response shapes from RAWG
- Game entity type definitions

**`services/`** - External API integration
- `rawg.service.ts` - All RAWG API calls and request handling

**`store/`** - Global state management
- Zustand stores for theme, user preferences, game sessions

**`theme/`** - Design system configuration
- Color palettes for light and dark modes
- Typography and font setup
- React Native Paper theme customization

---

## 🎓 Key Learning Outcomes

This project demonstrates proficiency in:

### React Native & Expo
- ✅ File-based routing with Expo Router
- ✅ Cross-platform component development
- ✅ Navigation patterns (stack, tab, native navigation)
- ✅ Platform-specific code handling

### State Management
- ✅ Global state with Zustand
- ✅ Local component state optimization
- ✅ Derived state patterns

### Data Management
- ✅ Async API integration
- ✅ Infinite pagination with `useInfiniteQuery`
- ✅ Caching strategies
- ✅ Error handling and retry logic
- ✅ Loading states and skeleton screens

### UI/UX Implementation
- ✅ Dynamic theming (light/dark modes)
- ✅ Material Design components
- ✅ Responsive layouts
- ✅ Touch interactions and animations
- ✅ Form handling and validation

### Development Practices
- ✅ TypeScript strict mode
- ✅ Component composition
- ✅ Custom hooks for logic reuse
- ✅ Environment configuration
- ✅ Error boundaries

---

## 🔧 Configuration

### Building for Production

```bash
# Build for Android
eas build --platform android --auto-submit

# Build for iOS
eas build --platform ios --auto-submit

# Submit to app stores
eas submit --platform android
eas submit --platform ios
```

### Performance Optimization

- Infinite scroll prevents loading all games at once
- TanStack Query caching eliminates redundant network requests
- React Native Paper components are heavily optimized
- Memoization on expensive components prevents re-renders

---

## 📊 API Reference

### RAWG.IO Integration

```typescript
// Fetch paginated games
GET /api/games?page={page}&page_size=20

// Response includes:
{
  id: number
  name: string
  released: string
  rating: number
  platforms: Array<{name: string}>
  background_image: string
}
```

Full documentation: [rawg.io/api](https://rawg.io/api)

---

## 🚦 Future Enhancements

- [ ] Game search with filters (genre, platform, rating)
- [ ] Saved favorite games list
- [ ] Multiplayer trivia mode
- [ ] Leaderboard with user scores
- [ ] Local notifications for new game releases
- [ ] Game recommendations based on preferences
- [ ] Share trivia results on social media

---

## 👤 Author

**Kelvin** - Full Stack Developer  
[LinkedIn](www.linkedin.com/in/kelvinorozcorodríguez)

---

## 🙏 Acknowledgments

- [RAWG Video Games Database](https://rawg.io/) - Game metadata
- [React Native](https://reactnative.dev/) - Framework
- [Expo](https://expo.dev/) - Development platform
- [TanStack](https://tanstack.com/) - Data fetching
- [React Native Paper](https://reactnativepaper.com/) - UI components

---

## 📝 Notes for Recruiters

**Why this project matters:**

This wasn't built as a complex enterprise application—it was intentionally designed as a **learning vehicle** to demonstrate:

1. **Technical Decision Making**: Why I chose each tool (TanStack Query > built-in fetching, Zustand > Redux, etc.)
2. **Production-Ready Patterns**: Proper error handling, loading states, caching strategies
3. **User Experience**: Smooth animations, responsive design, accessible dark mode
4. **Code Quality**: TypeScript strict mode, component composition, custom hooks
5. **Communication**: Clear README, well-structured code, architectural documentation

This reflects my approach to development: **choosing the right tool for the job, understanding trade-offs, and building with long-term maintainability in mind.**

---

**Last updated**: December 2025  
**Repository**: [github.com/kelvinor29/gamedex](https://github.com/kelvinor29/gamedex)
