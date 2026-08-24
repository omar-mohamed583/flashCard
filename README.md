# Flash Cards 🎴

An interactive web-based flashcard application built with React and Tailwind CSS. Create, manage, and study custom card decks with an intuitive interface and smooth animations.

## Features ✨

- **Create Custom Decks**: Add multiple flashcard decks with custom questions and answers
- **Interactive Cards**: Flip cards to reveal answers with smooth animations
- **Card Navigation**: Move between cards in a deck with Previous/Next buttons
- **Progress Tracking**: Visual progress bar showing your position in a deck
- **Hover Flip**: Option to flip cards on hover for quick review
- **Deck Management**: Select, edit, and manage multiple card collections
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Notifications**: Real-time feedback for user actions (success/error messages)
- **Edit Collections**: Modify existing decks and update card content

## Tech Stack 🛠️

- **Frontend Framework**: React (with Hooks)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Language**: JavaScript (91.6%)
- **Styling**: CSS (6.4%)
- **Markup**: HTML (2%)

## Project Structure 📁

```
src/
├── components/
│   ├── App.jsx                      # Main application component
│   ├── card.jsx                     # Individual flashcard component
│   ├── cardsHolder.jsx              # Container for displaying active card
│   ├── cardsCollectionsHolder.jsx   # Deck selector and controls
│   ├── navigationBar.jsx            # Navigation buttons (Previous/Next/Flip)
│   ├── progressbar.jsx              # Progress indicator
│   ├── sidebar.jsx                  # Sidebar for creating new decks
│   ├── notification.jsx             # Notification/toast component
│   ├── editCollectionDialog.jsx     # Modal for editing deck content
│   ├── collectionList.jsx           # Dropdown list of available decks
│   └── layoutHolder.jsx             # Layout wrapper component
└── context/
    ├── contextProvider.jsx          # Global state management
    └── showAnswercontext.jsx        # Answer visibility context
```

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/omar-mohamed583/flashCard.git
cd flashCard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage 📝

### Creating a New Deck
1. Click the **"Create custom cards"** button in the top-right
2. Enter your deck name
3. Add question/answer pairs (flashcard content)
4. Click submit to create your deck

### Studying a Deck
1. Select a deck from the **"Select cards deck"** dropdown
2. Use the **"Back"** and **"Next"** buttons to navigate cards
3. Click **"Flip card"** or hover over the card to reveal the answer
4. Watch the progress bar to track your progress

### Editing a Deck
1. Click the menu icon next to a deck name
2. Select the edit option
3. Modify the question/answer content
4. Save your changes

### Settings
- Toggle **"Flip card on hover"** to automatically show answers when hovering over cards

## Key Components 🧩

- **Card Component**: Displays a single flashcard with front (question) and back (answer) with 3D flip animation
- **Progress Bar**: Shows current position and percentage completion in the active deck
- **Navigation Bar**: Controls for moving between cards and flipping cards
- **Notification System**: Toast notifications for user feedback (success/error)
- **Collection Holder**: Manages deck selection and display
- **Sidebar**: Form interface for creating new card collections

## State Management 🔄

The app uses React Context API for global state management, handling:
- Active deck selection
- Current card progress
- Show/hide answer state
- Card collections data
- Notification messages
- UI state (sidebar, dialogs, menus)

## Browser Support 🌐

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Transforms and Animations

## License 📄

This project is open source and available under the MIT License.

## Author 👤

Created by [@omar-mohamed583](https://github.com/omar-mohamed583)

---

**Happy studying! 📚✨**
