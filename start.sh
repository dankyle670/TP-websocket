#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Quiz App - WebSocket Real-time${NC}"
echo -e "${YELLOW}===================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 18${NC}"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be >= 18. You have: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}\n"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}\n"
fi

# Check if tmux is available, otherwise use separate terminals
if command -v tmux &> /dev/null; then
    echo -e "${YELLOW}🔄 Starting all services with tmux...${NC}\n"
    
    # Create a new tmux session
    tmux new-session -d -s quiz
    
    # Window 1: Server
    tmux new-window -t quiz -n server "cd server && npm run dev"
    
    # Window 2: Host App
    tmux new-window -t quiz -n host "cd host-app && npm run dev"
    
    # Window 3: Player App
    tmux new-window -t quiz -n player "cd player-app && npm run dev"
    
    # Select first window
    tmux select-window -t quiz:1
    
    # Attach to session
    tmux attach-session -t quiz
else
    echo -e "${YELLOW}📋 Opening 3 terminals...${NC}\n"
    echo -e "${GREEN}✅ Please open 3 separate terminals and run:${NC}"
    echo -e "${YELLOW}Terminal 1:${NC} cd server && npm run dev"
    echo -e "${YELLOW}Terminal 2:${NC} cd host-app && npm run dev"
    echo -e "${YELLOW}Terminal 3:${NC} cd player-app && npm run dev"
    echo -e "\n${GREEN}Then open:${NC}"
    echo -e "${YELLOW}Host:${NC} http://localhost:5173"
    echo -e "${YELLOW}Player:${NC} http://localhost:5174"
fi
