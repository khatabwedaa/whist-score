# حاسب ويست (Whist Score)

A React Native / Expo application for tracking scores in **Sudanese Whist (ويست)** card game. The app is designed primarily for Arabic speakers with full RTL (Right-to-Left) support.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB)
![Expo](https://img.shields.io/badge/Expo-54-000020)

---

## 📱 Features

- **🎴 Game Score Tracking**: Track scores for Sudanese Whist card games
- **👥 Two Teams**: Support for two teams (لنا / لهم - Us / Them)
- **📊 Round Management**: Add, edit, and delete rounds with automatic score calculation
- **⚙️ Customizable Settings**: Configure target scores, fail modes, and round limits
- **📱 Offline Storage**: All data stored locally using AsyncStorage
- **🌙 Dark Theme**: Beautiful dark UI optimized for card game sessions
- **🔤 Arabic Interface**: Full Arabic UI with Sudanese dialect
- **↩️ RTL Support**: Complete Right-to-Left layout

---

## 🎯 Game Rules

Sudanese Whist is a trick-taking card game played by 4 players in 2 teams.

### Scoring Logic

- **Declarer Team (الداخل)**: The team that makes the bid
- **Bid**: A number between 7-13 representing the minimum tricks to win
- **If bid is met**: Declarer gains points equal to tricks won
- **If bid fails**: Declarer loses the bid value (negative), and opponent gains based on fail mode

### Fail Modes

The app supports three scoring modes when the declarer fails:

| Mode                          | Arabic            | Description                     |
| ----------------------------- | ----------------- | ------------------------------- |
| `minusBid_opponentZero`       | الخصم ياخد صفر    | Opponent gains 0 points         |
| `minusBid_opponentTricks`     | الخصم ياخد أكلاته | Opponent gains their tricks won |
| `minusBid_opponentDifference` | الخصم ياخد الفرق  | Opponent gains the difference   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd west-score
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your platform**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

---

## 📁 Project Structure

```
west-score/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Home screen (game list)
│   ├── new-game.tsx        # Create new game
│   ├── settings.tsx        # App settings
│   └── game/
│       └── [id]/           # Dynamic game routes
│           ├── index.tsx   # Game details
│           ├── add-round.tsx # Add new round
│           ├── settings.tsx  # Game settings
│           └── edit-round/   # Edit existing round
│
├── components/             # Reusable UI components
│   ├── AppLogo.tsx         # App logo component
│   ├── Button.tsx          # Custom button
│   ├── Card.tsx            # Card container
│   ├── EmptyState.tsx      # Empty state display
│   ├── GameCard.tsx        # Game list card
│   ├── Header.tsx          # Screen header
│   ├── Input.tsx           # Text input
│   ├── NumberInput.tsx     # Number input with +/- buttons
│   ├── RoundRow.tsx        # Round display row
│   ├── ScoreDisplay.tsx    # Score display component
│   ├── ScrollPicker.tsx    # Scroll picker for numbers
│   └── SegmentedControl.tsx # Segmented control
│
├── lib/                    # Core logic
│   ├── context.tsx         # React Context providers
│   ├── gameNames.ts        # Game name generation
│   ├── scoring.ts          # Score calculation logic
│   ├── storage.ts          # AsyncStorage operations
│   ├── theme.ts            # Colors, spacing, typography
│   └── types.ts            # TypeScript type definitions
│
├── i18n/                   # Internationalization
│   ├── ar.ts               # Arabic translations
│   ├── en.ts               # English translations
│   ├── index.ts            # i18n setup
│   └── translations.ts     # Translation keys
│
├── assets/                 # Images and icons
├── android/                # Android native code
├── ios/                    # iOS native code
└── scripts/                # Build scripts
```

---

## 🎮 How to Use

### 1. Create a New Game

1. Open the app
2. Tap **"لعبة جديدة"** (New Game)
3. Optionally customize:
   - Team names (default: لنا / لهم)
   - Target score (default: 25)
   - Maximum rounds (default: 4)
   - Fail mode
4. Tap **"ابدأ لعبة"** (Start Game)

### 2. Add a Round

1. Open an active game
2. Tap **"أضف صكة"** (Add Round)
3. Select:
   - **Declarer team** (الداخل): Which team made the bid
   - **Bid** (المزايدة): 7-13
   - **Tricks won**: Adjust for each team (must total 13)
4. Preview scores and tap **"حفظ"** (Save)

### 3. Track Progress

- View current scores at the top of the game screen
- See all rounds with their individual scores
- Leading team is highlighted
- Undo last round if needed

### 4. Finish a Game

- Game auto-finishes when target score is reached
- Or manually finish by tapping settings → **"خلص اللعبة"**
- Reopen finished games to continue playing

---

## 📊 Data Types

### Game

```typescript
interface Game {
  id: string;
  title: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  teamAName: string; // Default: "لنا"
  teamBName: string; // Default: "لهم"
  rounds: Round[];
  totalScoreTeamA: number;
  totalScoreTeamB: number;
  isFinished: boolean;
  winnerTeam?: "A" | "B";
  settings: GameSettings;
}
```

### Round

```typescript
interface Round {
  id: string;
  index: number; // Round number (1-based)
  declarerTeam: "A" | "B"; // Which team is declarer
  bid: number; // 7-13
  tricksTeamA: number; // 0-13
  tricksTeamB: number; // 0-13 (A+B must = 13)
  scoreTeamA: number; // Calculated score
  scoreTeamB: number; // Calculated score
  createdAt: string;
}
```

### Game Settings

```typescript
interface GameSettings {
  targetScore?: number; // Default: 25
  failMode: FailMode; // Scoring when declarer fails
  minBid: number; // Default: 7
  maxBid: number; // Default: 13
  maxRounds?: number; // Default: 4, undefined = unlimited
}
```

---

## 🛠️ Development

### Available Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm start`       | Start Expo development server |
| `npm run ios`     | Run on iOS simulator          |
| `npm run android` | Run on Android emulator       |
| `npm run web`     | Run in web browser            |

### Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Routing**: Expo Router (file-based routing)
- **State Management**: React Context
- **Storage**: @react-native-async-storage/async-storage
- **Language**: TypeScript
- **Styling**: StyleSheet with custom theme

### Key Dependencies

```json
{
  "expo": "~54.0.31",
  "expo-router": "~6.0.21",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@react-native-async-storage/async-storage": "2.2.0",
  "expo-localization": "~17.0.8"
}
```

---

## 🔧 Configuration

### App Configuration (`app.json`)

- **Bundle ID**: `com.westscore.app`
- **Theme**: Dark mode (`userInterfaceStyle: "dark"`)
- **Orientation**: Portrait only
- **New Architecture**: Enabled

### Default Game Settings

```typescript
const DEFAULT_GAME_SETTINGS = {
  targetScore: 25,
  failMode: "minusBid_opponentTricks",
  minBid: 7,
  maxBid: 13,
  maxRounds: 4,
};
```

---

## 📄 License

This project is private and proprietary.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**حاسب ويست** - Track your Sudanese Whist games with ease! 🃏
