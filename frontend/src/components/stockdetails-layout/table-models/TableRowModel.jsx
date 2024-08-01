import React, { useState } from 'react'
import { CustomTableCell, CustomTableRow } from '../../../styles/main';
import TablesMiniChart from '../tables-mini-charts/TablesMiniChart';
import TableRowModelTitle from './TableRowModelTitle';
import TableRowModelData from './TableRowModelData';
import TableRowModelAverages from './TableRowModelAverages';
import { Colors } from '../../../styles/theme';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import TablesModalChart from '../tables-modal-charts/TablesModalChart';

const TableRowModel = (props) => {

    const { title = '', titleBold = false, txtStyle = '', originalArray = [], originalArrayMetric = [], dataArray = [], dataMetric = [], avg2YrsElement = null, avg5YrsElement = null, reversed, dataFormat = '', positiveDataInverse, coloredData, rateValueAboveBellow = null, rateValuesMinAvgMax = null, rateValues = null, identLevel = 0, showExpandableMetric = null, setExpandableMetric } = props;

    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

    const handleExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandableMetric(!showExpandableMetric);
    }

    const handleModalChart = (modalChartDates, modalChartMetric, modalChartLabel, modalChartStyle) => {
        setCommonModalContent(
            <TablesModalChart 
                modalChartDates={modalChartDates} 
                modalChartMetric={modalChartMetric} 
                modalChartLabel={modalChartLabel} 
                modalChartStyle={modalChartStyle} 
            />
        )
        setCommonModalOpen(true);
    }

    return (
        <CustomTableRow
            clickable={'pointer'}
            txtStyle={txtStyle}
            sx=
            {{
                backgroundColor: 
                    txtStyle === '' ? '' 
                    :  txtStyle ==='success' ? `${Colors.table_colored_success} !important` 
                    : txtStyle ==='success_light' ? `${Colors.table_colored_success_light} !important`
                    : txtStyle ==='warning' ? `${Colors.table_colored_warning} !important`
                    : txtStyle ==='danger' ? `${Colors.table_colored_danger} !important`
                    : ''
            }}
            onClick={() => handleModalChart(dataArray?.map(record => record.date), dataMetric, title, dataFormat)}
        >
            
            <TableRowModelTitle 
                title={title} 
                titleBold={titleBold} 
                txtStyle={txtStyle} 
                identLevel={identLevel} 
                showExpandableMetric={showExpandableMetric} 
                handleExpand={handleExpand} 
            />

            <CustomTableCell scope="row" className='table-title' sx={{maxWidth:'120px', maxHeight:'35px'}}>
                <TablesMiniChart 
                    miniChartDates={originalArray?.map(record => record.date)} 
                    miniChartMetric={originalArrayMetric.slice(0).reverse()} 
                    positiveDataInverse={positiveDataInverse}
                />
            </CustomTableCell>

            <TableRowModelData 
                dataMetric={dataMetric} 
                txtStyle={txtStyle} 
                coloredData={coloredData} 
                rateValueAboveBellow={rateValueAboveBellow} 
                rateValuesMinAvgMax={rateValuesMinAvgMax} 
                reversed={reversed} 
                dataFormat={dataFormat} 
            />

            { avg2YrsElement 
                ? <TableRowModelAverages 
                    averageValue={avg2YrsElement} 
                    txtStyle={txtStyle} 
                    coloredData={coloredData} 
                    rateValueAboveBellow={rateValueAboveBellow} 
                    rateValuesMinAvgMax={rateValuesMinAvgMax} 
                    dataFormat={dataFormat} 
                /> 
                : ''
            }

            { avg5YrsElement 
                ? <TableRowModelAverages 
                    averageValue={avg5YrsElement} 
                    txtStyle={txtStyle} 
                    coloredData={coloredData} 
                    rateValueAboveBellow={rateValueAboveBellow} 
                    rateValuesMinAvgMax={rateValuesMinAvgMax} 
                    dataFormat={dataFormat} 
                /> 
                : ''
            }

        </CustomTableRow>
    )
}

export default TableRowModel;