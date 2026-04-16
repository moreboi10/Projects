# Just Divide – React Game

A browser-based puzzle game built using React, where tiles merge based on divisibility instead of equality.

---

## Overview

This project was developed as part of a frontend assignment to evaluate problem-solving, state management, and UI implementation skills.

The game consists of a 4x4 grid where users place numbers from a queue. Tiles merge when one value is divisible by another, creating a different strategic experience compared to traditional merge games.

---

## Features

* 4x4 interactive grid
* Dynamic tile queue
* Merge logic based on divisibility
* Keep system for storing and swapping tiles
* Trash system with limited uses
* Undo functionality using state snapshots
* Score and level progression
* Best score persistence using localStorage
* Timer that starts on first user interaction
* Basic drag-and-drop interaction for tile placement
* Game over detection with in-app overlay
* Restart functionality using page reload

---

## Architecture

The application is structured to separate game logic from UI rendering.

### State Management

Core game logic is handled inside a custom hook:

useGameState.js

This manages:

* Grid state
* Queue system
* Score and level
* Undo stack
* Game over logic

This approach keeps UI components simple and focused on rendering.

---

### Component Structure

App.jsx
├── Grid.jsx
│   └── Tile.jsx
├── Queue.jsx
├── Keep.jsx
├── Trash.jsx

Each component is responsible for a specific part of the interface, making the application modular and easier to maintain.

---

### Layout

The layout uses a flex-based structure to maintain a centered game board with a side panel.

Overlay elements such as score and level badges are positioned using relative and absolute positioning without affecting the grid layout.

---

## Challenges Faced

### Merge Logic

Implementing merge rules based on divisibility was more complex than standard equality-based merging. It required handling multiple conditions and supporting chain reactions correctly.

### State Consistency

The undo feature required maintaining snapshots of multiple states including grid, queue, score, and level. Ensuring consistency across all these states was challenging.

### Game Over Detection

The game needed to detect not only a full grid but also whether any valid moves were still possible, which required scanning neighboring cells and validating merge conditions.

### UI Alignment

Achieving the intended layout, including centered grid, floating badges, and decorative elements, required careful positioning and iterative adjustments.

### Timer Control

The timer was designed to start only after the first user interaction, which required additional state control instead of starting automatically on component mount.

---

## Possible Improvements

* Restart functionality without page reload
* Tile merge animations
* Responsive design for mobile devices
* Improved drag-and-drop experience
* Additional visual feedback for user actions

---

## Tech Stack

* React (Hooks)
* JavaScript (ES6+)
* CSS

---

## Running the Project

npm install
npm run dev

---

## Conclusion

This project demonstrates handling of complex state, modular component design, and building an interactive UI with attention to user experience and visual consistency.
