import React, { useContext } from 'react';
import { WebSocketContext } from '../context/WebSocket';

const TempComponent = ({ id }) => {
    const ws = useContext(WebSocketContext);
    const entry = Array.isArray(ws.lastJsonMessage) ? ws.lastJsonMessage.find(e => e.id === id) : null;

    return <>
        <h3>ID: {id}</h3>
        <h4>Temp: {entry ? entry.temperature : 0} C</h4>
    </>
}

export default TempComponent;