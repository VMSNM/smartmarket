import React from 'react'
import { CustomTableCell, CustomTableRow } from '../../../../../../styles/main'
import { RatedTableCell } from '../../../../../stockdetails-layout/table-models/styles/tablerowmodel'
import { Percent, USDollarCompact, convertToNumberAndRound } from '../../../../../../utils/useful'
import AssumptionsTableDataInputs from './AssumptionsTableDataInputs'
import { useDCFContext } from '../../../../../../context/DCFContext'

const AssumptionsTableDataRow = (props) => {

    const {metricTitle = '', metricDataLastYear = 0, metricDataAvg2YRS = null, metricDataAvg5YRS = null, metricDataCAGR = null, coloredData = 'positive', rateValueAboveBellow = null, rateValuesMinAvgMax = null, dataFormat = '', noInputs = false, inputsNames = null, inputsData = null } = props;

    const { value: { assumptionsSetup, setAssumptionsSetup }} = useDCFContext();

    return (
        <CustomTableRow>                
            <RatedTableCell className='table-title' sx={{textAlign:'left'}}>{metricTitle}</RatedTableCell>

            { metricDataLastYear
            ? 
            <>
            <RatedTableCell 
                metric={metricDataLastYear}
                coloredData={coloredData} 
                rateValueAboveBellow={rateValueAboveBellow} 
                rateValuesMinAvgMax={rateValuesMinAvgMax}
            >
                { dataFormat === 'percent' 
                    ? Percent(metricDataLastYear)
                        : dataFormat === 'float-number'
                        ? convertToNumberAndRound(metricDataLastYear)
                        : dataFormat === 'dollar-compact'
                        ? USDollarCompact.format(metricDataLastYear)
                        : metricDataLastYear
                }
            </RatedTableCell>
            </>
            :
            <>
                <CustomTableCell />
            </>
            }

            { metricDataAvg2YRS
            ? 
            <>
            <RatedTableCell
                metric={metricDataAvg2YRS}
                coloredData={coloredData} 
                rateValueAboveBellow={rateValueAboveBellow} 
                rateValuesMinAvgMax={rateValuesMinAvgMax}
            >
                { dataFormat === 'percent' 
                    ? Percent(metricDataAvg2YRS)
                        : dataFormat === 'float-number'
                        ? convertToNumberAndRound(metricDataAvg2YRS)
                        : dataFormat === 'dollar-compact'
                        ? USDollarCompact.format(metricDataAvg2YRS)
                        : metricDataAvg2YRS
                }
            </RatedTableCell>
            </>
            :
            <>
                <CustomTableCell />
            </>
            }

            { metricDataAvg5YRS
            ? 
            <>
            <RatedTableCell
                metric={metricDataAvg5YRS}
                coloredData={coloredData} 
                rateValueAboveBellow={rateValueAboveBellow} 
                rateValuesMinAvgMax={rateValuesMinAvgMax}
            >
                { dataFormat === 'percent' 
                    ? Percent(metricDataAvg5YRS)
                        : dataFormat === 'float-number'
                        ? convertToNumberAndRound(metricDataAvg5YRS)
                        : dataFormat === 'dollar-compact'
                        ? USDollarCompact.format(metricDataAvg5YRS)
                        : metricDataAvg5YRS
                }
            </RatedTableCell>
            </>
            :
            <>
                <CustomTableCell />
            </>
            }

            { metricDataCAGR 
            ? 
            <>
                <RatedTableCell
                    metric={metricDataCAGR}
                    coloredData={coloredData} 
                    rateValueAboveBellow={rateValueAboveBellow} 
                    rateValuesMinAvgMax={rateValuesMinAvgMax}
                >
                    {Percent(metricDataCAGR)}
                </RatedTableCell>
            </> 
            :
            <>
                <CustomTableCell />
            </>
            }
            
            { !noInputs && <AssumptionsTableDataInputs inputsNames={inputsNames} inputsData={inputsData} assumptionsSetup={assumptionsSetup} setAssumptionsSetup={setAssumptionsSetup} /> }

            { noInputs && (
                <>
                <CustomTableCell />
                <CustomTableCell />
                <CustomTableCell />
                </>
            )}
        </CustomTableRow>
    )
}

export default AssumptionsTableDataRow;