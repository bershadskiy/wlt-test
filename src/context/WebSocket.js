import React, { createContext } from 'react'
import useWebSocket from 'react-use-websocket';

const socketUrl = 'ws://localhost:8999';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
    let socket;
    let ws;

    if (!socket) {
        const {
            lastJsonMessage,
            getWebSocket
        } = useWebSocket(socketUrl, {
            shouldReconnect: () => true,
        });

        socket = getWebSocket();

        ws = {
            socket: socket,
            lastJsonMessage
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider