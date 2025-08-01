# Movie2Watch

A React application for browsing and saving movies using the TMDb API.

## 🚀 Features

- 🔍 Search for movies
- ⭐️ Add/remove movies to your personal watch list
- 📱 Responsive design (mobile & desktop)
- 🎲 Movie Picker

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Zustand for state management
- Tailwind CSS for styling
- TMDb API for movie data

## 📦 Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔐 Environment Variables

Create a `.env.local` file in the root and add the following:

```env
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> You can get a TMDb API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

## 📁 Project Structure (simplified)

```
src/
├── assets/         # Static files (e.g. fallback images)
├── components/     # Reusable UI components
├── features/          # Route-level components
├── hooks/          # Custom React hooks
├── lib/            # API clients and utilities
├── stores/         # Zustand stores
```

## 📄 License

This project is for educational purposes only. Not licensed for commercial use.
