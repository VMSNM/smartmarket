import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Legend, Tooltip, Filler} from "chart.js";
import { Line } from 'react-chartjs-2';
import { CircularProgress } from "@mui/material";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Title, Tooltip, Filler)

const TablesMiniChart = ({miniChartDates, miniChartMetric, positiveDataInverse = false}) => {
    
    const [lineColor, setLineColor] = useState("rgb(58,179,125,1)")
    const [fillColor, setFillColor] = useState("rgb(78,119,215,0.3)")

    useEffect(() => {
        handleMiniChartColor(miniChartMetric, positiveDataInverse, setLineColor, setFillColor);
    }, []);
    
    var data = {
        labels: (miniChartDates && miniChartDates.map(entry => entry)),
        datasets: [
            {
                label: 'Ticker PA',
                data: (miniChartMetric && miniChartMetric.map(entry => entry)),
                borderWidth: 1,
                borderColor: lineColor,
                fill: true,
                backgroundColor: fillColor
            }
        ]
    }
    var options = {
        responsive: true,
        aspectRatio: 120/30,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                display: false,
            },
            x: { display: false }
        },
        plugins: {
            legend: { display: false }
        },
        elements: {
            point:{
                radius: 0
            },
            line:{
                tension: 0.4
            }
        }
    }

    return (
        <>
            { !miniChartDates || !miniChartMetric && <CircularProgress /> }
            { miniChartDates && miniChartMetric && <Line data={data} options={options} /> }
        </>
        
    )
}

export default TablesMiniChart;

const handleMiniChartColor = (miniChartMetric, positiveDataInverse, setLineColor, setFillColor) => {
    if (((miniChartMetric[miniChartMetric.length -1] - miniChartMetric[0]) > 0)) {
        if (!positiveDataInverse) {
            setLineColor("green")
            setFillColor("rgb(135, 255, 135, 0.4")
        }
        else {
            setLineColor("red")
            setFillColor("rgb(255, 155, 135, 0.4")
        }
    }
    else {
        if (!positiveDataInverse) {
            setLineColor("red")
            setFillColor("rgb(255, 155, 135, 0.4")
        }
        else {
            setLineColor("green")
            setFillColor("rgb(135, 255, 135, 0.4")
        }
    }
}