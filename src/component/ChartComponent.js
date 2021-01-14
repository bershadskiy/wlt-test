import React, { useRef, useContext, useMemo, useEffect } from "react";
import * as d3 from "d3";
import { WebSocketContext } from '../context/WebSocket';

const ChartComponent = () => {
    const histSize = 100;
    const d3Ref = useRef();
    const messageHistory = useRef([]);
    const { lastJsonMessage } = useContext(WebSocketContext);

    messageHistory.current = useMemo(() => messageHistory.current = messageHistory.current.concat(lastJsonMessage), [lastJsonMessage]);

    useEffect(() => {
        let svg = d3.select(d3Ref.current)
            .append('svg')
            .attr('width', 480)
            .attr('height', 320);
    }, [d3Ref])

    return <>
        <h3>Chart</h3>
        <div ref={d3Ref} />
    </>;
}

export default ChartComponent;