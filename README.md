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
[] create and delete a categories
[] update category name or icon

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
不需要重複 backend README 的細節——只需要告訴 RN 這邊的人「怎麼把 backend 跑起來」和「怎麼設定連線」就夠了。詳細的 backend 說明讓他們去看 backend repo。

README要怎麼放上github顯示

6:51 PM
直接把 README.md 放在 project 根目錄就好——GitHub 會自動偵測並顯示在 repo 首頁。

你現在的 README.md 在哪裡？在根目錄嗎？

bash
ls README.md
如果已經在根目錄，commit 並 push 就會自動顯示：

bash
git add README.md
git commit -m "Add README"
git push



