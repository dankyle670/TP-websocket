# 🎯 Quiz App - WebSocket Temps Réel

Un quiz interactif en temps réel inspiré de **Kahoot**, construit avec **WebSocket**, **React 18** et **TypeScript**. Une application complète pour créer, héberger et jouer à des quiz en direct avec plusieurs joueurs.

## 📋 Table des matières

- [Caractéristiques](#-caractéristiques)
- [Architecture](#️-architecture)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Démarrage](#-démarrage)
- [Utilisation](#-utilisation)
- [Flux WebSocket](#-flux-websocket)
- [Calcul des scores](#-calcul-des-scores)
- [Dépannage](#-dépannage)
- [Technologies](#-technologies)

## ✨ Caractéristiques

- ✅ **Communication WebSocket en temps réel** - Synchronisation instantanée entre le serveur et les clients
- ✅ **Multi-joueurs** - Jusqu'à plusieurs centaines de joueurs simultanés
- ✅ **Création dynamique de quiz** - Interface pour créer des quizzes avec questions à choix multiples
- ✅ **Timer synchronisé** - Countdown identique pour tous les participants
- ✅ **Calcul automatique des scores** - Points basés sur la correction + bonus de rapidité
- ✅ **Classement en direct** - Leaderboard mis à jour après chaque question
- ✅ **Design responsive** - Thème sombre moderne, optimisé mobile
- ✅ **Auto-reconnexion** - Les clients se reconnectent automatiquement si la connexion se perd
- ✅ **TypeScript** - Code type-safe pour une meilleure qualité

## 🏗️ Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    WebSocket Server (Port 8080)             │
│              Node.js + ws + TypeScript                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  QuizRoom                                             │  │
│  │  ├── Players Map (id → {name, score, ws, isHost})  │  │
│  │  ├── Questions Array                                │  │
│  │  ├── Phase Management (lobby → question → results) │  │
│  │  ├── Timer & Score Calculation                      │  │
│  │  └── Broadcast to all players                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         ↑                                      ↑
         │ WebSocket                           │ WebSocket
         │                                     │
    ┌────┴────────────────┐        ┌──────────┴──────────┐
    │   Host App           │        │   Player App        │
    │ React + Vite         │        │  React + Vite       │
    │ Port 5173            │        │  Port 5174          │
    │                      │        │                     │
    │ ┌──────────────────┐ │        │ ┌────────────────┐ │
    │ │ CreateQuiz       │ │        │ │ JoinScreen     │ │
    │ │ Lobby            │ │        │ │ WaitingLobby   │ │
    │ │ QuestionView     │ │        │ │ AnswerScreen   │ │
    │ │ Results          │ │        │ │ FeedbackScreen │ │
    │ │ Leaderboard      │ │        │ │ ScoreScreen    │ │
    │ └──────────────────┘ │        │ └────────────────┘ │
    └────────────────────────┘        └────────────────────┘
       Présentateur                        Joueurs
```

## 📁 Structure du projet

```
quiz-app/
├── packages/
│   └── shared-types/                    # Types TypeScript partagés
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           └── index.ts
│
├── server/                              # Serveur WebSocket (Port 8080)
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                     # Routage messages
│   │   ├── QuizRoom.ts                  # Logique métier
│   │   └── rooms.ts
│
├── host-app/                            # React Présentateur (Port 5173)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx                      # Gestion d'état principale
│   │   ├── App.css
│   │   ├── hooks/
│   │   │   └── useWebSocket.ts
│   │   └── components/
│   │       ├── CreateQuiz.tsx
│   │       ├── Lobby.tsx
│   │       ├── QuestionView.tsx
│   │       ├── Results.tsx
│   │       └── Leaderboard.tsx
│   └── dist/
│
├── player-app/                          # React Joueurs (Port 5174)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── hooks/
│   │   │   └── useWebSocket.ts
│   │   └── components/
│   │       ├── JoinScreen.tsx
│   │       ├── WaitingLobby.tsx
│   │       ├── AnswerScreen.tsx
│   │       ├── FeedbackScreen.tsx
│   │       └── ScoreScreen.tsx
│   └── dist/
│
├── package.json                         # Monorepo root
└── README.md                            # Ce fichier
```

## 🚀 Installation

### Prérequis

- **Node.js >= 18** 
- **npm** (inclus avec Node.js)

### Étapes

1. **Accédez au dossier du projet**

```bash
cd /Users/ousmanesacko/Desktop/TP-websocket
```

2. **Installer les dépendances**

```bash
npm install
```

Cela installe automatiquement pour tous les workspaces.

3. **Vérifier TypeScript**

```bash
cd server && npx tsc --noEmit
cd ../host-app && npx tsc --noEmit
cd ../player-app && npx tsc --noEmit
```

## 🎮 Démarrage (3 terminaux)

**Terminal 1 - Serveur WebSocket**
```bash
cd /Users/ousmanesacko/Desktop/TP-websocket/server
npm run dev
```

**Terminal 2 - Host App**
```bash
cd /Users/ousmanesacko/Desktop/TP-websocket/host-app
npm run dev
```

**Terminal 3 - Player App**
```bash
cd /Users/ousmanesacko/Desktop/TP-websocket/player-app
npm run dev
```

### Accès

- **Host (Présentateur)** : http://localhost:5173
- **Player (Joueurs)** : http://localhost:5174

## 📖 Utilisation

### 🎤 Côté Présentateur

1. Créez un quiz en ajoutant questions et réponses
2. Recevez un code (ex: `6H8VOJ`)
3. Les joueurs entrent ce code
4. Attendez que les joueurs rejoignent
5. Cliquez "Start Quiz"
6. Pour chaque question, voyez les réponses en temps réel
7. Les résultats s'affichent automatiquement
8. Cliquez "Next Question" pour continuer

### 🎮 Côté Joueur

1. Entrez le code du quiz
2. Entrez votre nom
3. Attendez que le quiz commence
4. Pour chaque question, cliquez votre réponse
5. Voyez si c'est correct et vos points
6. Attendez le classement final

## 📡 Flux WebSocket

### Messages Client → Serveur

```typescript
// Création du quiz
{
  type: 'host:create',
  quizCode: 'ABC123',
  questions: [...]
}

// Rejoindre un quiz
{
  type: 'join',
  quizCode: 'ABC123',
  name: 'Alice'
}

// Soumettre une réponse
{
  type: 'answer',
  questionId: 1,
  choiceIndex: 2
}

// Lancer le quiz
{ type: 'host:start' }

// Question suivante
{ type: 'host:next' }
```

### Messages Serveur → Clients

```typescript
// État général
{
  type: 'state',
  phase: 'lobby' | 'question' | 'results' | 'leaderboard',
  players: [...],
  question: {...}
}

// Timer
{
  type: 'tick',
  remaining: 9000
}
```

## 🧮 Calcul des scores

### Formule

```
Si réponse correcte:
  score = 1000 + Math.round(500 * (remaining / 10000))

Si réponse incorrecte:
  score = 0
```

### Exemple

| Joueur | Réponse | Temps | Score |
|--------|---------|-------|-------|
| Alice  | ✅     | 8s    | 1400  |
| Bob    | ✅     | 5s    | 1250  |
| Steve  | ❌     | 3s    | 0     |

## 🎨 Design

- **Thème** : Mode sombre
- **Couleurs** :
  - Primaire : Indigo (#6366f1)
  - Succès : Vert (#10b981)
  - Erreur : Rouge (#ef4444)
  - Fond : Slate (#0f172a)
- **Responsive** : Desktop, Tablet, Mobile

## 🐛 Dépannage

### "Cannot GET /"
```bash
# Vérifiez que Vite tourne
cd host-app && npm run dev
lsof -i :5173
```

### "WebSocket connection failed"
```bash
# Vérifiez le serveur
cd /Users/ousmanesacko/Desktop/TP-websocket/server && npm run dev
```

### Les joueurs ne s'affichent pas
1. F12 → Console sur Host et Player
2. Vérifiez les messages "Received"
3. Redémarrez le serveur

### Port déjà utilisé
```bash
# Trouvez le process
lsof -i :8080

# Tuez-le
kill -9 <PID>
```

### npm ERR!
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🛠️ Technologies

| Composant | Tech | Version |
|-----------|------|---------|
| Frontend | React | 18.2 |
| Bundler | Vite | 5.0+ |
| Serveur | Node.js | 18+ |
| WebSocket | ws | 8.19 |
| Langage | TypeScript | 5.2+ |
| Build | ts-node | 10.9+ |
| CSS | CSS3 | pur |

## 📚 Types principaux

```typescript
type QuizPhase = 'lobby' | 'question' | 'results' | 'leaderboard' | 'ended'

interface Player {
  id: string
  name: string
  score: number
  isHost?: boolean
}

interface Question {
  id: number
  text: string
  choices: string[]
  correctIndex: number
}
```

## 🚀 Build production

```bash
# Host
cd host-app && npm run build

# Player
cd ../player-app && npm run build

# Serveur
cd ../server
node src/index.ts
```

## 💬 Support

Pour les bugs :
1. Vérifiez les logs serveur
2. Ouvrez DevTools (F12)
3. Vérifiez les ports : 5173, 5174, 8080
4. Consultez le [Dépannage](#-dépannage)

---

- Ousmane Sacko
- OUARDI Ahmed-Amine
- KOMOE Daniel
