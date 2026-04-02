# Shopping List App 
This is a demo app written in React Native for framework learning. User can use it to manage the shopping list.

## Tech Stack
React Native, TypeScript

## Features 
[v] login
[] register
[v] list all shopping items
[v] create and delete a shopping item
[v] mark a shopping item as purchased, or update shopping item attributes
[] put purchased and non-purchased items in different sections
[v] create and delete a categories
[v] update category name or icon

## Getting Started 
Download npx, expo via terminal, then run
npx expo start

## Backend 
This app requires the companion backend to run.

Repo: https://github.com/whitney13625/ShoppingListTypeScriptBackend

### Quick Start
```bash
# Clone backend repo
git clone https://github.com/whitney13625/ShoppingListTypeScriptBackend

# Option A: Docker (recommended)
docker compose up

# Option B: Manual
npm install
npm run migrate
npm run dev
```

### Environment

Update `.env` with your backend host:
```
EXPO_PUBLIC_API_HOST_IOS=your-mac-ip      # e.g. 192.168.1.x
EXPO_PUBLIC_API_HOST_ANDROID=10.0.2.2     # Android Emulator default
EXPO_PUBLIC_API_PORT=3000
```



