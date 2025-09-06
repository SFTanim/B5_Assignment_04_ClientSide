# Minimal Library Management System - Frontend 📚

Frontend of the Minimal Library Management System built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.  
Provides a UI to manage books, perform CRUD operations, borrow books, and view a borrow summary.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Routes & Pages](#routes--pages)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Bonus Features](#bonus-features)

---

## Features

- View all books in a table with details and status.
- Add, edit, and delete books via modals.
- Borrow books with quantity & due date validation.
- Borrow summary page showing aggregated borrowed books.
- Responsive and minimalist UI with Tailwind CSS.
- Toast notifications using **React-Toastify**.

---

## Technology Stack

- React + TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS
- React-Toastify
- React Router DOM

---

## Project Structure

```
/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components (Books, AddBook, BorrowSummary)
│ ├── redux/
│ │ └── api/ # RTK Query API slices
│ ├── App.tsx
│ └── index.tsx
├── public/
└── package.json
```


---

## Routes & Pages

| Route                | Description                           |
|----------------------|---------------------------------------|
| `/books`             | Displays all books with actions       |
| `/create-book`       | Form to add a new book                |
| `/books/:id`         | Detailed view of a single book        |
| `/borrow/:bookId`    | Borrow a selected book                |
| `/borrow-summary`    | Shows aggregated borrow summary       |

---

## Installation

```bash
git clone https://github.com/SFTanim/B5_Assignment_04_ClientSide.git
cd B5_Assignment_04_ClientSide
npm install
npm run dev
