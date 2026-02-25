# 🎯 Quiz App - Démarrage Rapide

## ⚡ 30 secondes pour commencer

### 1️⃣ Installer les dépendances
```bash
npm install
```

### 2️⃣ Ouvrir 3 terminaux et lancer les services

**Terminal 1 - Serveur WebSocket (port 8080)**
```bash
cd server
npm run dev
```
Output attendu: `WS server running on ws://localhost:8080`

**Terminal 2 - Host App (port 5173)**
```bash
cd host-app
npm run dev
```
Output attendu: `VITE ... ready in XXXms`

**Terminal 3 - Player App (port 5174)**
```bash
cd player-app
npm run dev
```
Output attendu: `VITE ... ready in XXXms`

### 3️⃣ Ouvrir les navigateurs

- **Présentateur (Host)** : https://localhost:5173
- **Joueur (Player)** : http://localhost:5174

## 📖 Utilisation

### Pour le Présentateur 👨‍🏫
1. Crée un quiz en ajoutant questions et réponses
2. Clique "Create Quiz"
3. Partage le code affiché avec les joueurs
4. Clique "Start Quiz" quand tous les joueurs sont prêts

### Pour les Joueurs 👨‍🎓
1. Saisit le **code quiz** du présentateur
2. Saisit son nom
3. Clique "Join Quiz"
4. Attends que le quiz commence
5. Pour chaque question :
   - Choisit une réponse parmi 4 options
   - Voit le retour ✅ ou ❌
6. Consulte le classement final

## 🆘 Dépannage

### "Cannot GET /XX"
- Assurez-vous que Vite tourne sur le bon port
- Essayez de recharger la page (Ctrl+R)

### WebSocket connexion refusée
- Vérifiez que le serveur tourne sur `ws://localhost:8080`
- Regardez la console du navigateur (F12 > Console)

### npm ERR install
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Architecture

```
Host (Présentateur)          Serveur WebSocket          Player (Joueur)
     ↓                              ↓                         ↓
  React 5173                    Node.js 8080              React 5174
   localhost                   QuizRoom.ts               localhost
```

## 📚 Structure des fichiers importants

- `server/src/index.ts` : Routage des messages WebSocket
- `server/src/QuizRoom.ts` : Logique métier du quiz
- `host-app/src/App.tsx` : Gestion d'état du présentateur
- `player-app/src/App.tsx` : Gestion d'état du joueur

## 💡 Points clés

✅ WebSocket temps réel  
✅ Multi-joueurs  
✅ Timer synchronisé  
✅ Calcul automatique des scores  
✅ Classement en direct  
✅ Design responsive  

---

- Ousmane Sacko
- OUARDI Ahmed-Amine
- KOMOE Daniel
