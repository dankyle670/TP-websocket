import { useEffect, useRef, useCallback, useState } from 'react'

export type ServerMessage = any

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState<ServerMessage | null>(null)

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(url)

      ws.current.onopen = () => {
        console.log('Connected to server')
        setConnected(true)
      }

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('Received:', data)
        setMessage(data)
      }

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnected(false)
      }

      ws.current.onclose = () => {
        console.log('Disconnected from server')
        setConnected(false)
        // Auto-reconnect after 3 seconds
        setTimeout(connect, 3000)
      }
    }

    connect()

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close()
      }
    }
  }, [url])

  const send = useCallback((data: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket not connected, message not sent:', data)
    }
  }, [])

  return { connected, message, send }
}
