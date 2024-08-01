import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale} from "chart.js";
import { Line } from 'react-chartjs-2';
import { USDollarCompact } from "../../../../../utils/useful";
import { Box } from "@mui/material";
import { Colors } from "../../../../../styles/theme";
import { useThemeContext } from "../../../../../context/ThemeContext";
import { StockDetailsBox } from "../../../../../styles/stockdetails-layout";
import { useStockDetailsContext } from "../../../../../context/StockDetailsContext";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

const DCFChart = ({dcfChartData, selectedProjection}) => {
    const {  mode } = useThemeContext();
    
    useEffect(() => {
    })

    var data = {
        labels: (dcfChartData && dcfChartData.dates.map(record => record)),
        datasets: [
            {
                label: 'Historic',
                data: (dcfChartData && dcfChartData?.metricHistoric.map(record => record)),
                borderWidth: 1,
                borderColor: Colors.secondary,
                backgroundColor: Colors.secondary_light_opacity,
                /* fill: selectedProjection !== 'all' ? true : false */
                fill: true
            },
            {
                label: 'Low Assumptions',
                data: (dcfChartData && dcfChartData?.metricLow.map(record => record)),
                borderWidth: 1,
                borderColor: selectedProjection === 'low' || selectedProjection === 'all' ? Colors.danger : 'transparent',
                backgroundColor: Colors.danger_light_opacity,
                fill: selectedProjection === 'low' || selectedProjection === 'all' ? true : false
            },
            {
                label: 'Mid Assumptions',
                data: (dcfChartData && dcfChartData?.metricMid.map(record => record)),
                borderWidth: 1,
                borderColor: selectedProjection === 'mid' || selectedProjection === 'all' ? Colors.warning : 'transparent',
                backgroundColor: Colors.warning_light_opacity,
                fill: selectedProjection === 'mid' || selectedProjection === 'all' ? true : false
            },
            {
                label: 'High Assumptions',
                data: (dcfChartData && dcfChartData?.metricHigh.map(record => record)),
                borderWidth: 1,
                borderColor: selectedProjection === 'high' || selectedProjection === 'all' ? Colors.success : 'transparent',
                backgroundColor: Colors.success_light_opacity,
                fill: selectedProjection === 'high' || selectedProjection === 'all' ? true : false
            }
        ]
        
    }
    var options = {
        responsive: true,
        aspectRatio: 2|3,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.border : Colors.black,
                    callback: function(value) {
                        return USDollarCompact.format(value)
                    }
                },
                grid: {
                    color: mode === 'dark' ?  Colors.primaryBGdark : Colors.primaryBG,
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat", //this change the font size
                    },
                    /* autoSkip: false, */
                    maxRotation: 45,
                    minRotation: 45,
                    color: mode === 'dark' ?  Colors.border : Colors.black,
                },
                grid: {
                    color: mode === 'dark' ?  Colors.primaryBGdark : Colors.primaryBG,
                },
            }
        },
        layout: {
            padding: 0
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.border : Colors.black,
                },
            }
        },
        elements: {
            point:{
                radius: 1,
                pointStyle: 'circle'
            },
            line:{
                tension: 0.4,
                borderJoinStyle: "round",
            },

        }
    }

    return (
        <StockDetailsBox width={'100%'} padding={'40px 20px !important'}>
            <Line
                data={data}
                options={options}
            />
        </StockDetailsBox>
    )
}

export default DCFChart;