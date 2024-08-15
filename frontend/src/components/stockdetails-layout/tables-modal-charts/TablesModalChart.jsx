import React from "react";
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { Percent, USDollarCompact } from "../../../utils/useful";
import { Colors } from "../../../styles/theme";
import { useThemeContext } from '../../../context/ThemeContext';
import { Box } from "@mui/material";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip)

const TablesModalChart = ({modalChartDates, modalChartMetric, modalChartLabel, modalChartStyle}) => {
    const {  mode } = useThemeContext();

    var data = {
        labels: (modalChartDates && modalChartDates.map(record => record)),
        datasets: [
            {
                label: modalChartLabel,
                data: (modalChartMetric && modalChartMetric.map(record => record)),
                backgroundColor: Colors.secondary, //#348134
                borderWidth: 1,
                /*borderColor: 'black',*/
                borderRadius: 3
            }
        ]
    }
    var options = {
        responsive: true,
        aspectRatio: 2|3,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black,
                    callback: function(value) {
                        if (modalChartStyle === 'dollar-compact') {
                            return USDollarCompact.format(value)
                        }
                        else if (modalChartStyle === 'percent') {
                            return Percent(value)
                        }
                        else { return value }
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black
                }
            }
            
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black
                }
            }
        }
    }

    return (
        <Box sx={{ width: '85vw', maxWidth: '900px' }}>
            <Bar
                data={data}
                options={options}
            />
        </Box>
    )
}

export default TablesModalChart;