import React, { useRef, useContext, useMemo, useEffect } from "react";
import * as d3 from "d3";
import { WebSocketContext } from '../context/WebSocket';

const ChartComponent = () => {
    const histSize = 20;
    const maxLimitInt = 100;
    const d3Ref = useRef();
    // const svgRef = useRef();
    const messageHistory = useRef({});
    const { lastJsonMessage } = useContext(WebSocketContext);

    const width = 960;
    const height = 500;
    const xScale = d3.scaleLinear()
        .domain([0, histSize - 1])
        .range([0, width]);
    const yScale = d3.scaleLinear()
        .domain([0, maxLimitInt])
        .rangeRound([height, 0]);
    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX)
        ;

    //update and prepare new data
    messageHistory.current = useMemo(() => {
        if (Array.isArray(lastJsonMessage)) {
            lastJsonMessage.forEach((jsonMessage) => {
                const { id, data } = jsonMessage;
                if (data >= maxLimitInt)
                    return;

                if (!messageHistory.current[id])
                    messageHistory.current[id] = {
                        id,
                        values: []
                    };

                messageHistory.current[id].values = [...messageHistory.current[id].values, data]
                if (messageHistory.current[id].values.length > histSize)
                    messageHistory.current[id].values.splice(0, 1)
            });
        }
        return messageHistory.current;
    }, [lastJsonMessage]);

    useEffect(() => {
        const adj = 100;
        const margin = 5;
        const padding = 5;
        const svg = d3.select(d3Ref.current)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "-"
                + adj + " -"
                + adj + " "
                + (width + adj * 3) + " "
                + (height + adj * 3))
            .style("padding", padding)
            .style("margin", margin)
            .classed("svg-content", true);

        const xaxis = d3.axisBottom()
            .scale(xScale);

        const yaxis = d3.axisLeft()
            .scale(yScale);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis);

        svg.append("g")
            .attr("class", "axis")
            .call(yaxis);

        // svg.data([0,10,20,30]).append("path")
        //     .attr("class", "line-1") // Assign a class for styling 
        //     .attr("d", line)
        //     .style('stroke-width', 1)
        //     .style('stroke', 'green');

        // svg.data([20,30,40,50]).append("path")
        //     .attr("class", "line-2") // Assign a class for styling 
        //     .attr("d", line)
        //     .style('stroke-width', 1)
        //     .style('stroke', 'steelblue');

        // svgRef.current = svg;
    }, []);

    useEffect(() => {
        const svg = d3.select(d3Ref.current).select('svg');
        const newData = [];
        for (const id in messageHistory.current) {
            // const newData = messageHistory.current[id].values;
            newData.push(messageHistory.current[id].values);
        }
        const selection = svg.selectAll(`path.line`).data(newData);

        selection.exit().remove();
        const enter = selection.enter()
            .append("path")
            .attr('class', `line`)
            .attr("fill", "none")
            .attr("stroke", (d,i)=> i > 0 ? 'green': 'red')
            .attr("stroke-width", 1.5)
            ;

        enter.merge(selection).attr('d', line);


        /* selection.join(
            enter => enter
                .append("path")
                .attr('class', `line`)
                .attr("fill", "none")
                .attr("stroke", 'green')
                .attr("stroke-width", 1.5)
                
            ,
            update => update
                .transition()
                .duration(200)

            ,
            exit => exit.remove()
        ); */
        // selection
        //     .enter()
        //     .append("path")
        //     .data(idData, d=>d.data)
        //     .attr("class",`line-${id}`)
        //     .merge(selection)
        //     .transition()
        //     .duration(150)
        //     .attr("d",line)
        //     .style('stroke-width', 1)
        //     .style('stroke', 'green');

    }, [lastJsonMessage]);

    return <>
        <h3>Chart</h3>
        <div ref={d3Ref} className="w-full h-full" />
    </>;
}

export default ChartComponent;