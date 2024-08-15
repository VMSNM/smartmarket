import React, { useState } from "react";
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { useStockDetailsContext } from "../../../context/StockDetailsContext";
import { USDollarCompact } from "../../../utils/useful";
import { FinancialsFullChartBox } from "../../../styles/stockdetails-layout";
import { useThemeContext } from "../../../context/ThemeContext";
import { Colors } from "../../../styles/theme";

ChartJS.register(BarElement, LinearScale, CategoryScale)

const IncomeStatementChart = () => {
    const { mode } = useThemeContext();
    const { value: { stockDetails: { incomeStatement }}} = useStockDetailsContext();

    const [chartData, setChartData] = useState(incomeStatement?.slice(0).reverse() || null);
    
    var data = {
        labels: (chartData && chartData?.map(record => record.date)),
        datasets: [
            {
                label: 'Total Expenses',
                data: (chartData && chartData?.map(record => (record.revenue - record.netIncome))),
                backgroundColor: [`${Colors.danger}`],
                borderWidth: 1,
                /*borderColor: 'black',*/
                borderRadius: 3
            },
            {
                label: 'Revenue',
                data: (chartData && chartData?.map(record => record.revenue)),
                backgroundColor: [`${Colors.success}`],
                borderWidth: 1,
                /*borderColor: 'black',*/
                borderRadius: 3
            }
        ]
    }
    var options = {
        callback: function() {
            console.log(window.innerWidth)
        },
        responsive: true,
        aspectRatio: 2|3,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat",
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black,
                    callback: function(value) {
                        return USDollarCompact.format(value)
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 13,
                        family: "Montserrat",
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 13,
                        family: "Montserrat",
                    },
                    color: mode === 'dark' ?  Colors.white : Colors.black
                }
            }
        }
    }

    return (
        <FinancialsFullChartBox>
            <Bar
                data={data}
                options={options}
            />
        </FinancialsFullChartBox>
    )
}

export default IncomeStatementChart;