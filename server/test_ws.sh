#!/bin/bash

echo "Test WebSocket Quiz Server"

SERVER_URL="ws://localhost:8080"

# Test serveur Node actif
echo "Checking server connection..."

timeout 2 bash -c "</dev/tcp/localhost/8080" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "Server not reachable on port 8080"
    echo "➡ Run: npm run dev in server/"
    exit 1
fi

echo "Port 8080 open"

# Test WebSocket handshake via curl (simple probe)
curl -i -N -H "Connection: Upgrade" \
   -H "Upgrade: websocket" \
   -H "Host: localhost:8080" \
   http://localhost:8080 2>/dev/null

echo ""
echo "If HTTP 101 Switching Protocols appears → WS server OK"