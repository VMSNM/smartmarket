import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { StockDetailsBox } from "../../../../styles/stockdetails-layout";
import { Percent } from "../../../../utils/useful";
import { Colors } from "../../../../styles/theme";
import { useThemeContext } from "../../../../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const HoldingsChart = ({portfolio}) => {
    const {mode} = useThemeContext();
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        let dataSetup = portfolio?.tickers?.map(ticker => ticker);
        dataSetup.push({symbol: 'Cash', percentageOfPortfolio: portfolio?.cashPositionPercentage})
        setChartData(dataSetup);
    }, [portfolio])
    
    var data = {
        labels: (chartData && chartData.map(ticker => ticker.symbol)),
        datasets: [
            {
                labels: (chartData && chartData.map(ticker => ticker.symbol)),
                data: (chartData && chartData.map(ticker => ticker.percentageOfPortfolio * 100)),
                borderWidth: '1',
                borderColor: "white",
                backgroundColor: ['rgb(35,156,47,0.9)', 'rgb(130,155,161,0.9)', 'rgb(55,55,71,0.9)', 'rgb(255,55,21,0.9)', 'rgb(61,94,255,0.9)', 'rgb(135,106,147,0.9)', 'rgb(235,135,127,0.9)', 'rgb(135,56,47,0.9)', 'rgb(35,156,147,0.9)', 'rgb(35,56,47,0.9)']
            }
        ]
    } 

    var options = {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
    
        plugins: {
            title: {
                display: true,
                text: 'Holdings',
                font: { size: 18, family: "Montserrat", },
                color: mode === 'dark' ? Colors.white : Colors.black
            }, 
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 13,
                        family: "Montserrat",
                    },
                    color: '#555',
                    backgroundColor: ['rgb(44,179,2,0.7)', 'rgb(9,20,20,0.7)', 'rgb(55,55,71,0.7)']
                }
            },
            chartLabels: {
                color: 'red'
            },
            tooltip: {
                font: {
                    size: 13,
                    family: "Montserrat",
                },
                color: '#555',
                backgroundColor: 'rgb(0,0,0,0.7)',
                enabled: false,
            }
        }
    }

    const alwaysShowTip = {
        id: 'alwaysShowTip',

        /* beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart
            ctx.save()

            const xCoord = chart.getDatasetMeta(0).data[0].x
            console.log(xCoord)
            const yCoord = chart.getDatasetMeta(0).data[0].y

            ctx.font = "bolder 50px Montserrat";
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(data, xCoord, xCoord)
            ctx.restore()
        }, */

        afterDraw(chart, args, options) {
            const { ctx, data } = chart
            ctx.save()

            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                    const { x, y } = datapoint.tooltipPosition()

                    let textLabel = dataset.labels[index]
                    let textData = datapoint.$context.parsed

                    ctx.fillStyle = "#fff";
                    ctx.font = "bold 14px Montserrat";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillText(
                        Percent(textData) ,
                        x + 0 / 2,
                        y + 0 / 2,
                        80
                    );
                    ctx.restore()

                    ctx.fillStyle = "#fff";
                    ctx.font = "11px Montserrat";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillText(
                        textLabel,
                        x + 0 / 2,
                        y + 30 / 2,
                        80
                    );
                    ctx.restore()

                })
            })
        }
    }   
    
    return (
        <StockDetailsBox>
            <Doughnut
                data={data}
                options={options}
                plugins={[alwaysShowTip]}
            />
        </StockDetailsBox>
    )
    
}

export default HoldingsChart;