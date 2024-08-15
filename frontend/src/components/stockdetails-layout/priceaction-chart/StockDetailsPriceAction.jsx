import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import './StockDetailsPriceAction.css';
import PriceActionChartNavBtns from "./PriceActionChartNavBtns";
import { useStockDetailsContext } from "../../../context/StockDetailsContext";
import { Colors } from "../../../styles/theme";
import { Filler } from "chart.js";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Legend, Tooltip} from "chart.js";
import { USDollarCompact, convertToNumberAndRound } from "../../../utils/useful";
import { useThemeContext } from "../../../context/ThemeContext";

ChartJS.register(Filler, LineElement, PointElement, LinearScale, CategoryScale, Legend, Title, Tooltip)

const StockDetailsPriceAction = () => {
    const { value: {stockDetails: { priceActionDates, priceActionPrices }}} = useStockDetailsContext();
    const {  mode } = useThemeContext();

    const [chartDates, setChartDates] = useState(priceActionDates);
    const [chartPrices, setChartPrices] = useState(priceActionPrices);
    const [lineColor, setLineColor] = useState("transparent")
    const [fillColor, setFillColor] = useState("transparent")

    useEffect(() => {
        setChartDates(priceActionDates);
        setChartPrices(priceActionPrices);
    }, [priceActionDates, priceActionPrices]);

    useEffect(() => {
        if (chartPrices !== null) {
            handleChartColor(chartPrices, setFillColor, setLineColor);
        }
    }, [chartDates, chartPrices]);

    var data = {
        labels: (chartDates && chartDates.map(record => record)),
        datasets: [
            {
                label: 'Stock Price',
                data: (chartPrices && chartPrices.map(record => record)),
                borderWidth: 1,
                borderColor: lineColor,
                fill: true,
                backgroundColor: fillColor
            }
        ]
    }
    var options = {
        responsive: true,
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
                        /* return USDollarCompact.format(value) */
                        return USDollarCompact.format(value);
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat", //this change the font size
                    },
                    color: mode === 'dark' ?  Colors.border : Colors.black,
                },
                lines: {
                    display: false
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
                    color: mode === 'dark' ?  Colors.border : Colors.black,
                }
            }
        },
        elements: {
            point:{
                radius: .1
            }
        }
    }

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} className="chart-data chart-stock-price">
                <>
                { !priceActionDates || !priceActionPrices && <CircularProgress sx={{width: '100%'}} /> }
                { priceActionDates && priceActionPrices && (
                    <>
                    <Line
                        style={{maxWidth: '100%'}}
                        data={data}
                        options={options}
                    />
                    <PriceActionChartNavBtns setChartDates={setChartDates} setChartPrices={setChartPrices} />
                    </>
                )}
                </>
            </Box>
        </>
    )
}

export default StockDetailsPriceAction;

const handleChartColor = (chartPrices, setFillColor, setLineColor) => {
    const nowPrice = convertToNumberAndRound(chartPrices[chartPrices.length - 1]);
    const beginPrice = convertToNumberAndRound(chartPrices[0]);
    if (nowPrice > beginPrice) {
        setLineColor(Colors.success);
        setFillColor(Colors.success_light_opacity);
        return;
    }
    if (nowPrice < beginPrice) {
        setLineColor(Colors.danger);
        setFillColor(Colors.danger_light_opacity);
        return;
    }
    setLineColor(Colors.warning);
    setFillColor(Colors.warning_light_opacity);
}