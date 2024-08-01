import React, { useState } from 'react'
import { CustomTableCell, CustomTableRow } from '../../../../styles/main';
import TableRowModelTitle from '../../../stockdetails-layout/table-models/TableRowModelTitle';
import TablesMiniChart from '../../../stockdetails-layout/tables-mini-charts/TablesMiniChart';
import TableRowModelData from '../../../stockdetails-layout/table-models/TableRowModelData';
import { Colors } from '../../../../styles/theme';
import NNWCTableSelectDR from './NNWCTableSelectDR';
import { green } from '@mui/material/colors';

const NNWCTableRow = (props) => {

    const { title = '', titleBold = false, txtStyle = '', originalArray = [], originalArrayMetric = [], dataArray = [], dataMetric = [], dataFormat = '', positiveDataInverse, coloredData, rateValueAboveBellow = null, rateValuesMinAvgMax = null, showDiscountRate = false, discountName = '', baseDiscountRate = null, nnwcDR, setNNWCDR } = props;

    return (
        <CustomTableRow
            clickable={''}
            txtStyle={txtStyle}
            sx=
            {{
                backgroundColor: 
                    txtStyle === '' ? '' 
                    :  txtStyle ==='success' ? `${green[400]} !important` 
                    : txtStyle ==='success_light' ? `${green[600]} !important`
                    : txtStyle ==='warning' ? `${Colors.table_colored_warning} !important`
                    : txtStyle ==='danger' ? `${Colors.table_colored_danger} !important`
                    : ''
            }}
            /* onClick={() => openModalChart(dataArray?.map(record => record.date), dataMetric, title, dataFormat)} */
        >
            
            <TableRowModelTitle title={title} titleBold={titleBold} txtStyle={txtStyle} />

            <CustomTableCell scope="row" className='table-title' sx={{maxWidth:'120px', maxHeight:'35px'}}>
                <TablesMiniChart 
                    miniChartDates={originalArray?.map(record => record.date)} 
                    miniChartMetric={originalArrayMetric.slice(0).reverse()} 
                    positiveDataInverse={positiveDataInverse}
                />
            </CustomTableCell>

            <TableRowModelData dataMetric={dataMetric} txtStyle={txtStyle} coloredData={coloredData} rateValueAboveBellow={rateValueAboveBellow} rateValuesMinAvgMax={rateValuesMinAvgMax} dataFormat={dataFormat} />

            { showDiscountRate ? <NNWCTableSelectDR showDiscountRate={showDiscountRate} discountName={discountName} baseDiscountRate={baseDiscountRate} nnwcDR={nnwcDR} setNNWCDR={setNNWCDR} /> : '' }

            { !showDiscountRate ? <CustomTableCell /> : '' }

        </CustomTableRow>
    )
}

export default NNWCTableRow;