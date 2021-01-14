import React, { createContext } from 'react'
import useWebSocket from 'react-use-websocket';

const socketUrl = 'ws://localhost:8999';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
    const {
        lastJsonMessage,
        getWebSocket
    } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
    });

    const socket = getWebSocket();
    const ws = {
        socket: socket,
        lastJsonMessage
    };

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider