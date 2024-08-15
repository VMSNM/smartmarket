import React from 'react'
import { CustomTableCell, CustomTableRow } from '../../../styles/main'
import { Percent, USDollarCompact } from '../../../utils/useful'
import { useModalChartContext } from '../../../context/ModalChartContext'
import TablesMiniChart from '../../stockdetails-layout/tables-mini-charts/TablesMiniChart'
import { Colors } from '../../../styles/theme'

const TableData10PillarsRow = ({ title, originalArray, originalArrayMetric, dataArray, dataMetric, reversed, dataFormat, avg2YrsElement, avg5YrsElement, coloredData, rateValues }) => {
    const { value: { openModalChart }} = useModalChartContext();

    return (
        <CustomTableRow
            clickable={'pointer'}
            onClick={() => openModalChart(dataArray?.map(record => record.date), dataMetric, title, dataFormat)}
        >
            <CustomTableCell scope="row" className='table-title' sx={{textAlign:'left'}}>
                {title}
            </CustomTableCell>

            <CustomTableCell scope="row" className='table-title' sx={{maxWidth:'120px', maxHeight:'35px'}}>
                <TablesMiniChart 
                    miniChartDates={originalArray?.map(record => record.date)} 
                    miniChartMetric={originalArrayMetric.slice(0).reverse()} 
                    positiveDataInverse={title === 'Shares Outstanding' || title === 'Total Liabilities' || title === 'PE Ratio' || title === 'PFCF Ratio' || title === 'Debt To Equity' ? true : false} 
                />
            </CustomTableCell>

            { dataMetric && dataMetric.map((element, idx) => (
                <CustomTableCell 
                    key={idx}
                    txtColor={
                        (coloredData !== 'positive' && coloredData !== 'negative') ? ''

                        : ((coloredData === 'positive' && element >= rateValues?.max) || (coloredData === 'negative' && element <= rateValues?.min)) ? Colors.success

                        : ((coloredData === 'positive' && element >= rateValues?.avg) || (coloredData === 'negative' && element <= rateValues?.avg)) ? Colors.warning

                        : Colors.danger
                    }
                    className={((!reversed && idx === dataMetric.length -1) || (reversed && idx === 0)) ? 'table-title' : ''}
                >
                    { dataFormat === 'dollar-compact' 
                        ? USDollarCompact.format(element)
                        : dataFormat==='percent' 
                            ? Percent(element)
                            : element 
                    }
                </CustomTableCell>
            ))}

            <CustomTableCell scope="row" className='table-title'
                txtColor={
                    (coloredData !== 'positive' && coloredData !== 'negative') ? ''
                    
                    : ((coloredData === 'positive' && avg2YrsElement >= rateValues?.max) || (coloredData === 'negative' && avg2YrsElement <= rateValues?.min)) ? Colors.success

                    : ((coloredData === 'positive' && avg2YrsElement >= rateValues?.avg) || (coloredData === 'negative' && avg2YrsElement <= rateValues?.avg)) ? Colors.warning

                    : Colors.danger
                }
            >
                { dataFormat === 'dollar-compact' 
                    ? USDollarCompact.format(avg2YrsElement) 
                    : dataFormat==='percent' 
                            ? Percent(avg2YrsElement)
                            : avg2YrsElement 
                }
            </CustomTableCell>

            <CustomTableCell scope="row" className='table-title'
                txtColor={
                    (coloredData !== 'positive' && coloredData !== 'negative') ? ''
                    
                    : ((coloredData === 'positive' && avg5YrsElement >= rateValues?.max) || (coloredData === 'negative' && avg5YrsElement <= rateValues?.min)) ? Colors.success

                    : ((coloredData === 'positive' && avg5YrsElement >= rateValues?.avg) || (coloredData === 'negative' && avg5YrsElement <= rateValues?.avg)) ? Colors.warning

                    : Colors.danger
                }   
            >
                { dataFormat === 'dollar-compact' 
                    ? USDollarCompact.format(avg5YrsElement) 
                    : dataFormat==='percent' 
                            ? Percent(avg5YrsElement)
                            : avg5YrsElement 
                }
            </CustomTableCell>
        </CustomTableRow>
    )
}

export default TableData10PillarsRow